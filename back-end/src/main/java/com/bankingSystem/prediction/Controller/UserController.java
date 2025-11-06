package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Service.UserService;
import com.bankingSystem.prediction.dto.UpdateUserRequestDTO;
import com.bankingSystem.prediction.dto.UserResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Update User
    @PutMapping("/update-user/{id}")
    public ResponseEntity<?> editUser(
            @PathVariable("id") String userId,
            @RequestBody UpdateUserRequestDTO updateRequest
    ) {
            UserResponseDTO updatedUser = userService.updateUser(userId, updateRequest);
            return ResponseEntity.ok(updatedUser);

    }
}
