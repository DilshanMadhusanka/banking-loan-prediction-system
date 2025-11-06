package com.bankingSystem.prediction.dto;

import lombok.Data;

@Data
public class UpdateUserRequestDTO {

    private String name;
    private String email;
    private String mobile;
    private Long roleId;
}

