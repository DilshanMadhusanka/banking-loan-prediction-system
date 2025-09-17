package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.UserRepository;
import com.bankingSystem.prediction.Service.JWTService;
import com.bankingSystem.prediction.Service.UserService;
import com.bankingSystem.prediction.dto.UserResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {

    private final UserRepository userRepository;

    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    // get the current user details who logged to the system
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        // Get current authenticated user from SecurityContext
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof org.springframework.security.core.userdetails.User userDetails) {
            String username = userDetails.getUsername();

            UserEntity user = userRepository.findByUsername(username).orElse(null);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            UserResponseDTO responseDTO = new UserResponseDTO(
                    user.getName(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getCreatedAt()
            );

            return ResponseEntity.ok(responseDTO);
        }

        return ResponseEntity.status(401).build();
    }


    // get all the users in the system
    @GetMapping("/all-user")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

}