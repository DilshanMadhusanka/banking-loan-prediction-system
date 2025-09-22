package com.bankingSystem.prediction.Service;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.UserRepository;
import com.bankingSystem.prediction.dto.LoginRequestDTO;
import com.bankingSystem.prediction.dto.LoginResponseDTO;
import com.bankingSystem.prediction.dto.RegisterRequestDTO;
import com.bankingSystem.prediction.dto.RegisterResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthService {

    // data-base( repository) eke ewa use krann oni nisa
    private  final UserRepository userRepository;
    private  final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private  final JWTService jwtService;


    // constructor
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    // get all user
    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    // create user
    public  UserEntity createUser(RegisterRequestDTO userData){
        UserEntity newUser = new UserEntity(userData.getName(), userData.getUsername(), userData.getEmail(), passwordEncoder.encode(userData.getPassword()));
        return  userRepository.save(newUser);
    }

    // login logic
    public LoginResponseDTO login(LoginRequestDTO loginData) {
        try {
            // authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword())
            );
        } catch (Exception e) {
            return new LoginResponseDTO(null, null, "Invalid username or password", "error");
        }

        // ✅ get user data from DB
        UserEntity user = userRepository.findByUsername(loginData.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found in DB"));

        // ✅ build dynamic claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("name", user.getName());
        claims.put("id", user.getId());

        // if later you add roles, you can fetch it from DB instead of hardcoding
        claims.put("role", "USER");

        // ✅ generate token with actual user info
        String token = jwtService.getJWTToken(user.getUsername(), claims);

        return new LoginResponseDTO(token, LocalDateTime.now(), null, "Token generated successfully!");
    }


    public RegisterResponseDTO register (RegisterRequestDTO req){
        if(isUserEnable(req.getUsername()))
            return new RegisterResponseDTO(null, "user already exits in the system !");

        var userData = this.createUser(req);
        if(userData.getId()==null)  return new RegisterResponseDTO(null, "system error!");

        return new RegisterResponseDTO(String.format("user registered at %s", userData.getId()),null);
     }

    // function for check the user in the database
    private Boolean isUserEnable(String username){
        return userRepository.findByUsername(username).isPresent();
    }

    // log-out function
    public String logout() {
        // For JWT, just instruct client to delete token
        return "Logged out successfully! ";
    }
}
