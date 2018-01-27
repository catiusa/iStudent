package ro.ubb.istudent.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import ro.ubb.istudent.util.Channel;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailChannel implements Channel {

    public static final String EMAIL_TEXT = "Welcome, \n  We invite you to be part of our educational platform. \n If you accept the challenge,click the link below.\n";
    public static final String SUBJECT = "Registration";

    private JavaMailSenderImpl mailSender;

    EmailChannel(){

        mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.googlemail.com");
        mailSender.setPort(587);
        mailSender.setUsername("onlinetestsproiectcolectiv@gmail.com");
        mailSender.setPassword("proiectcolectiv2017");
        Properties javaMailProperties = new Properties();
        javaMailProperties.setProperty("mail.debug", "false");
        javaMailProperties.setProperty("mail.smtp.auth", "true");
        javaMailProperties.setProperty("mail.smtp.starttls.enable", "true");
        mailSender.setJavaMailProperties(javaMailProperties);
    };

    @Override
    public void sendMessage(String address, String body)
    {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);


        try
        {
            helper.setTo(address);
            helper.setText(EMAIL_TEXT + " http://localhost:8080" + body);
            helper.setSubject(SUBJECT);
            mailSender.send(message);
        }
        catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}
