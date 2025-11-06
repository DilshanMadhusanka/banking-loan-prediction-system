package com.bankingSystem.prediction.dto;

import com.bankingSystem.prediction.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDTO {

    private String name;
    private String username;
    private String email;
    private String password;
    private Long roleId;
    private String mobile;
}
