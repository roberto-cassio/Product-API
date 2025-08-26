package com.example.productapi.auth;

import com.example.productapi.auth.dtos.UserResponseDto;

public class LoginResponse {
    private String token;

    private long expiresIn;

    private UserResponseDto user;

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public UserResponseDto getUser() {
        return user;
    }

    public void setUser(UserResponseDto user) {
        this.user = user;
    }

    

    
}
