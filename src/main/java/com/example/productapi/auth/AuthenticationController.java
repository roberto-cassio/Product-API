package com.example.productapi.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.productapi.auth.dtos.LoginResponseDto;
import com.example.productapi.auth.dtos.LoginUserDto;
import com.example.productapi.auth.dtos.RegisterUserDto;
import com.example.productapi.auth.dtos.UserResponseDto;

import jakarta.validation.Valid;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        UserResponseDto response = UserResponseDto.fromEntity(registeredUser);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        UserResponseDto userDto = UserResponseDto.fromEntity(authenticatedUser);

        LoginResponseDto loginResponse = new LoginResponseDto()
        .setToken(jwtToken)
        .setExpiresIn(jwtService.getExpirationTime())
        .setUser(userDto);

        return ResponseEntity.ok(loginResponse);
    }
}