package com.example.productapi.auth;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.productapi.auth.dtos.LoginUserDto;
import com.example.productapi.auth.dtos.RegisterUserDto;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegisterUserDto validRegisterDto;
    private LoginUserDto validLoginDto;
    private User validUser;

    @BeforeEach
    void setUp() {
        validRegisterDto = new RegisterUserDto();
        validRegisterDto.setFirstName("Teste Mock");
        validRegisterDto.setLastName("Sobrenome Mock");
        validRegisterDto.setEmail("teste@mock.com");
        validRegisterDto.setPassword("password123");

        validLoginDto = new LoginUserDto();
        validLoginDto.setEmail("teste@mock.com");
        validLoginDto.setPassword("password123");

        validUser = new User();
        validUser.setId(1L);
        validUser.setFirstName("Teste Mock");
        validUser.setLastName("Sobrenome Mock");
        validUser.setEmail("teste@mock.com");
        validUser.setPassword("encodedPassword123");
    }

    @Test
    void shouldSignupUserSuccessfully() {
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(userRepository.save(any(User.class))).thenReturn(validUser);

        User result = authenticationService.signup(validRegisterDto);

        assertThat(result).isNotNull();
        assertThat(result.getFirstName()).isEqualTo("Teste Mock");
        assertThat(result.getLastName()).isEqualTo("Sobrenome Mock");
        assertThat(result.getEmail()).isEqualTo("teste@mock.com");
        assertThat(result.getPassword()).isEqualTo("encodedPassword123");

        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldEncodePasswordWhenSigningUp() {
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            assertThat(user.getPassword()).isEqualTo("encodedPassword123");
            return user;
        });

        authenticationService.signup(validRegisterDto);

        verify(passwordEncoder).encode("password123");
    }

    @Test
    void shouldAuthenticateUserSuccessfully() {
        when(userRepository.findByEmail("teste@mock.com")).thenReturn(Optional.of(validUser));
        doNothing().when(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));

        User result = authenticationService.authenticate(validLoginDto);

        assertThat(result).isNotNull();
        assertThat(result.getEmail()).isEqualTo("teste@mock.com");
        assertThat(result.getFirstName()).isEqualTo("Teste Mock");

        verify(authenticationManager).authenticate(
            argThat(token -> 
                token.getPrincipal().equals("teste@mock.com") && 
                token.getCredentials().equals("password123")
            )
        );
        verify(userRepository).findByEmail("teste@mock.com");
    }

    @Test
    void shouldThrowExceptionWhenUserNotFoundDuringAuthentication() {
        when(userRepository.findByEmail("teste@mock.com")).thenReturn(Optional.empty());
        doNothing().when(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));

        assertThatThrownBy(() -> authenticationService.authenticate(validLoginDto))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessage("User with this email not found: teste@mock.com");

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail("teste@mock.com");
    }

    @Test
    void shouldThrowExceptionWhenAuthenticationManagerFails() {
        doThrow(new BadCredentialsException("Invalid credentials"))
            .when(authenticationManager)
            .authenticate(any(UsernamePasswordAuthenticationToken.class));

        assertThatThrownBy(() -> authenticationService.authenticate(validLoginDto))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessage("Invalid credentials");

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, never()).findByEmail(any());
    }

    @Test
    void shouldCreateUserWithCorrectFieldsWhenSigningUp() {
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            
            assertThat(savedUser.getFirstName()).isEqualTo("Teste Mock");
            assertThat(savedUser.getLastName()).isEqualTo("Sobrenome Mock");
            assertThat(savedUser.getEmail()).isEqualTo("teste@mock.com");
            assertThat(savedUser.getPassword()).isEqualTo("encodedPassword");
            
            return savedUser;
        });

        authenticationService.signup(validRegisterDto);

        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldUseCorrectAuthenticationTokenWhenAuthenticating() {
        when(userRepository.findByEmail("teste@mock.com")).thenReturn(Optional.of(validUser));
        
        authenticationService.authenticate(validLoginDto);

        verify(authenticationManager).authenticate(
            argThat(token -> {
                assertThat(token).isInstanceOf(UsernamePasswordAuthenticationToken.class);
                assertThat(token.getPrincipal()).isEqualTo("teste@mock.com");
                assertThat(token.getCredentials()).isEqualTo("password123");
                return true;
            })
        );
    }

    @Test
    void shouldHandleNullInputsGracefully() {
        RegisterUserDto nullDto = null;

        assertThatThrownBy(() -> authenticationService.signup(nullDto))
                .isInstanceOf(NullPointerException.class);
    }

    @Test
    void shouldReturnSameUserFoundInRepository() {
        User expectedUser = new User();
        expectedUser.setId(999L);
        expectedUser.setEmail("teste@mock.com");
        expectedUser.setFirstName("Different Name");
        
        when(userRepository.findByEmail("teste@mock.com")).thenReturn(Optional.of(expectedUser));
        doNothing().when(authenticationManager).authenticate(any());

        User result = authenticationService.authenticate(validLoginDto);

        assertThat(result).isSameAs(expectedUser);
        assertThat(result.getId()).isEqualTo(999L);
        assertThat(result.getFirstName()).isEqualTo("Different Name");
    }
}
