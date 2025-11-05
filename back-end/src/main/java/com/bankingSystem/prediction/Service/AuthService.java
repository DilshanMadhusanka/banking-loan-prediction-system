package com.bankingSystem.prediction.Service;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.UserRepository;
import com.bankingSystem.prediction.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private  final UserRepository userRepository;
    private  final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private  final JWTService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    // login function
    public LoginResponseDTO login(LoginRequestDTO loginData) {
        try {
            // authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword())
            );
        } catch (Exception e) {
            return new LoginResponseDTO(null, null, "Invalid username or password", "error");
        }
        // get user data from DB
        UserEntity user = userRepository.findByUsername(loginData.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found in DB"));

        // generate token with actual user info
        String token = jwtService.getJWTToken(
                user.getUsername()
                );

        return new LoginResponseDTO(token, LocalDateTime.now(), null, "Token generated successfully!");
    }

    // create user
    public RegisterResponseDTO register (RegisterRequestDTO req){
        if(isUserEnable(req.getUsername()))
            return new RegisterResponseDTO(null, "user already exits in the system !");

        var userData = this.createUser(req);
        if(userData.getId()==null)  return new RegisterResponseDTO(null, "system error!");

        return new RegisterResponseDTO(String.format("user registered at %s", userData.getId()),null);
     }


    public UserEntity createUser(RegisterRequestDTO userData) {
        UserEntity newUser = UserEntity.builder()
                .name(userData.getName())
                .username(userData.getUsername())
                .email(userData.getEmail())
                .password(passwordEncoder.encode(userData.getPassword()))
                .build();

        return userRepository.save(newUser);
    }

    // log-out function
    public String logout() {
        // For JWT, just instruct client to delete token
        return "Logged out successfully! ";
    }

    // check the user in the database
    private Boolean isUserEnable(String username){
        return userRepository.findByUsername(username).isPresent();
    }


    // get current user
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        // Get current authenticated user from SecurityContext
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof org.springframework.security.core.userdetails.User userDetails) {
            String username = userDetails.getUsername();

            UserEntity user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

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

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getName(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}
