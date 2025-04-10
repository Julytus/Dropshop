package com.julytus.DropShop.controller;

import com.julytus.DropShop.dto.request.LogoutRequest;
import com.julytus.DropShop.dto.request.SignInRequest;
import com.julytus.DropShop.dto.request.SignUpRequest;
import com.julytus.DropShop.dto.response.RefreshTokenResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.dto.response.SignInResponse;
import com.julytus.DropShop.dto.response.UserResponse;
import com.julytus.DropShop.service.AuthService;
import com.julytus.DropShop.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/sign-in")
    ResponseData<SignInResponse> signIn(@RequestBody @Valid SignInRequest request,
                                        HttpServletResponse response) {
        var result = authService.signIn(request, response);
        return ResponseData.<SignInResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Sign in success")
                .data(result)
                .build();
    }

    @PostMapping("/sign-up")
    ResponseData<UserResponse> signUp(@RequestBody @Valid SignUpRequest request) {
        var result = userService.createUser(request);

        return ResponseData.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("User created")
                .data(result)
                .build();
    }

    @PostMapping("logout")
    ResponseData<Void> logOut(@RequestBody LogoutRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ResponseData.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Sign out successfully!")
                .build();
    }

    @PostMapping("/refresh-token")
    ResponseData<RefreshTokenResponse> refreshToken(@CookieValue(name = "refreshToken") String refreshToken) {
        var result = authService.refreshToken(refreshToken);
        return ResponseData.<RefreshTokenResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Refreshed token successfully!")
                .data(result)
                .build();
    }
}
