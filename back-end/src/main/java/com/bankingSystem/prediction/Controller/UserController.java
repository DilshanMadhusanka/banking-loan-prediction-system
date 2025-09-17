package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.UserRepository;
import com.bankingSystem.prediction.Service.JWTService;
import com.bankingSystem.prediction.dto.UserResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {

    private final UserRepository userRepository;
    private final JWTService jwtService;

    public UserController(UserRepository userRepository, JWTService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7); // remove "Bearer "
        String username = jwtService.getUserName(token);

        if (username == null) {
            return ResponseEntity.status(401).build();
        }

        UserEntity user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // map entity to DTO
        UserResponseDTO responseDTO = new UserResponseDTO(
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt()
        );

        return ResponseEntity.ok(responseDTO);
    }
}