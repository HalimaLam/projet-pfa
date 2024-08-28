package com.example.backApp.payload.response;

import com.example.backApp.entities.ERole;

import java.util.List;

public class LoginResponse {
    private String username;
    private List<ERole> roles;
    private long userId;

    public LoginResponse(String username, List<ERole> roles, Long id) {
        this.userId=id;
        this.username = username;
        this.roles = roles;
    }

    // Getters and Setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<ERole> getRoles() {
        return roles;
    }

    public void setRoles(List<ERole> roles) {
        this.roles = roles;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}

