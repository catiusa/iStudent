package ro.ubb.istudent.controller;

import io.swagger.models.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import ro.ubb.istudent.aspects.Loggable;
import ro.ubb.istudent.domain.ValidToken;
import ro.ubb.istudent.dto.UserDTO;
import ro.ubb.istudent.repository.ValidTokenRepository;
import ro.ubb.istudent.security.TokenUtils;
import ro.ubb.istudent.service.UserService;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    private final UserService userService;
    private final TokenUtils tokenUtils;
    private final UserDetailsService userDetailsService;
    private final ValidTokenRepository validTokenRepository;
    private final AuthenticationManager authenticationManager;

    public static final String EMAIL_TEXT = "Welcome, \n  We invite you to be part of our educational platform. \n If you accept the challenge,click the link below.\n";
    public static final String SUBJECT = "Registration";

    @Autowired
    public TeacherController(UserService userService, AuthenticationManager authenticationManager, TokenUtils tokenUtils, UserDetailsService userDetailsService, ValidTokenRepository validTokenRepository) {
        this.tokenUtils = tokenUtils;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.validTokenRepository = validTokenRepository;
        this.userService = userService;
    }

    @Autowired
    private JavaMailSender mailSender;

    @Loggable
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addTeacher(@RequestBody UserDTO teacher) {
        boolean saved = false;
        String token;
        String teacherEmail = teacher.getEmail();
        teacher.setPassword("12345678");
        if (teacherEmail != null || teacherEmail != "") {
            try {
                UserDTO u = userService.findByEmail(teacherEmail);
            } catch (Throwable er) {
                try {

                    userService.saveUser(teacher);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(teacherEmail);
                    token = tokenUtils.generateToken(userDetails);
                    Date expirationDate = tokenUtils.getExpirationDateFromToken(token);

                    validTokenRepository.save(ValidToken.builder()
                            .token(token)
                            .expirationDate(expirationDate)
                            .build());

                    String teacherAddress = teacher.getEmail();
                    String confirmationUrl = "/teacher/registration?token=" + token + "&email=" + teacherEmail;


                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message);

                    helper.setTo(teacherAddress);
                    helper.setText(EMAIL_TEXT + " http://localhost:8080" + confirmationUrl);
                    helper.setSubject(SUBJECT);

                    mailSender.send(message);
                    return ResponseEntity.ok("ok");
                } catch (Throwable e) {
                    e.printStackTrace();
                    ResponseEntity.ok("Already exists this email!");
                }
            }
        } else
            return ResponseEntity.ok("Invalid email string!");


        return ResponseEntity.ok("Error!");
    }

    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String confirmRegistration
            (@RequestParam("token") String token, @RequestParam("email") String email, HttpServletResponse response) throws IOException {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        "12345678"
                ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if (tokenUtils.validateToken(token, userDetails)) {
            response.sendRedirect("http://localhost:8080/html/teacherRegistration.html");
            return "/html/teacherRegistration.html";
        } else {
            response.sendRedirect("http://localhost:8080/");
            return "";
        }
    }
}
