package ro.ubb.istudent.dto;

import lombok.*;
import ro.ubb.istudent.domain.Gender;
import ro.ubb.istudent.domain.UserRole;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO implements Serializable {

    private String id;
    private String userName;
    private String email;
    private String password;
    private String address;
    private String phoneNumber;
    private Integer age;
    private String gender;
    private List<UserRole> roles;

}
