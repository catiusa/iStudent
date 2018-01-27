package ro.ubb.istudent.service;

import ro.ubb.istudent.dto.UserDTO;

import java.util.List;

public interface UserService {

    boolean saveUser(UserDTO user) throws Throwable;

    UserDTO findByEmail(String email);

    UserDTO findByUserName(String userName);

    List<UserDTO> getAll();

    boolean updateUser(UserDTO userDTO);
}
