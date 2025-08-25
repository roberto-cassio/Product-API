package com.example.productapi.auth.dtos;

import com.example.productapi.auth.User;
public class UserResponseDto {
    private String email;
    private String firstName;
    private String lastName;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public static UserResponseDto fromEntity(User user) {
      UserResponseDto dto = new UserResponseDto();
      dto.setEmail(user.getEmail());
      dto.setFirstName(user.getFirstName());
      dto.setLastName(user.getLastName());
      return dto;
    }
}
