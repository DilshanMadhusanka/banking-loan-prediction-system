package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Service.AuthService;
import com.bankingSystem.prediction.dto.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/all-user")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginData,
                                                  HttpServletResponse response) {

        LoginResponseDTO res = authService.login(loginData);

        if (res.getError() != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        // Set JWT token as HttpOnly cookie using jakarta.servlet
        Cookie cookie = new Cookie("JWT_TOKEN", res.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/"); // cookie available for all paths
        cookie.setMaxAge(15 * 60);
        response.addCookie(cookie);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO req) {

        RegisterResponseDTO res = authService.register(req);
        if (res.getError() != null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // Expire the cookie
        Cookie cookie = new Cookie("JWT_TOKEN", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true if using HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(0); // expire immediately
        response.addCookie(cookie);

        return ResponseEntity.ok(authService.logout());
    }

    // get current user
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        return authService.getCurrentUser();
    }
}
