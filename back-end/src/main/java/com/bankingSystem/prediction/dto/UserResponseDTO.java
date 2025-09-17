package com.bankingSystem.prediction.dto;

import java.sql.Timestamp;

public class UserResponseDTO {

    private String name;
    private String username;
    private String email;
    private Timestamp createdAt;

    public UserResponseDTO(String name, String username, String email, Timestamp createdAt) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
