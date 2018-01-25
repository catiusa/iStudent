package ro.ubb.istudent.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ro.ubb.istudent.domain.User;
import ro.ubb.istudent.domain.UserRole;
import ro.ubb.istudent.dto.UserDTO;
import ro.ubb.istudent.repository.UserRepository;
import ro.ubb.istudent.service.UserService;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class DemoData {
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public DemoData(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        insertAdminUser();
    }

    private void insertAdminUser() {
        Optional<User> admin = userRepository.findByEmail("admin@gmail.com");
        // check if the user is already present
        if (admin.isPresent()) {
            return;
        }
        List<UserRole> roles = new ArrayList<>();
        roles.add(UserRole.ADMIN);
        UserDTO userDTO = UserDTO.builder()
            .email("admin@gmail.com")
            .password("admin")
            .userName("admin")
            .phoneNumber("0750698241")
            .gender("M")
            .address("bulevardul inventata nr 1")
            .age(30)
            .roles(roles)
            .build();

        try {
            userService.saveUser(userDTO);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
}
