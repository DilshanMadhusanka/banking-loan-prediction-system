package com.bankingSystem.prediction.Service;

import com.bankingSystem.prediction.Entity.Role;
import com.bankingSystem.prediction.Entity.UserEntity;
import com.bankingSystem.prediction.Repository.RoleRepository;
import com.bankingSystem.prediction.Repository.UserRepository;
import com.bankingSystem.prediction.dto.UpdateUserRequestDTO;
import com.bankingSystem.prediction.dto.UserResponseDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private  final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,  RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    // Update User
    public UserResponseDTO updateUser(String userId, UpdateUserRequestDTO updateRequest)  {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Update fields if provided
        if (updateRequest.getName() != null) user.setName(updateRequest.getName());
        if (updateRequest.getEmail() != null) user.setEmail(updateRequest.getEmail());
        if (updateRequest.getMobile() != null) user.setMobile(updateRequest.getMobile());

        // Update role if provided
        if (updateRequest.getRoleId() != null) {
            Role role = roleRepository.findById(updateRequest.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found with id: " + updateRequest.getRoleId()));
            user.setRole(role);
        }

        UserEntity updatedUser = userRepository.save(user);

        return new UserResponseDTO(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getCreatedAt(),
                updatedUser.getRole().getRoleName(),
                updatedUser.getMobile()
        );
    }
}
