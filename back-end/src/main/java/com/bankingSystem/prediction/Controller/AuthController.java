package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Service.AuthService;
import com.bankingSystem.prediction.dto.LoginRequestDTO;
import com.bankingSystem.prediction.dto.LoginResponseDTO;
import com.bankingSystem.prediction.dto.RegisterRequestDTO;
import com.bankingSystem.prediction.dto.RegisterResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin
public class AuthController {

    // get the service
    private  final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public List<UserEntity> getAllUsers(){
        return authService.getAllUsers();
    }

    @PostMapping
    public UserEntity createUser (@RequestBody RegisterRequestDTO user){
        return  authService.createUser(user);

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginData){

        LoginResponseDTO res = authService.login(loginData);
        if(res.getError() != null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);

    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> login(@RequestBody RegisterRequestDTO req){

        RegisterResponseDTO res = authService.register(req);
        if(res.getError() != null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);

    }
}
