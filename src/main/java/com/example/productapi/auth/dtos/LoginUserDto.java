package com.example.productapi.auth.dtos;

public class LoginUserDto {
    private String email;
    private String password;

    // Getters and Setters
    //TODO: Check if password will really have a getter with plain text
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
