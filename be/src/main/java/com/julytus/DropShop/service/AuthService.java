package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.LogoutRequest;
import com.julytus.DropShop.dto.request.SignInRequest;
import com.julytus.DropShop.dto.response.RefreshTokenResponse;
import com.julytus.DropShop.dto.response.SignInResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CookieValue;

public interface AuthService {
    SignInResponse signIn(SignInRequest request, HttpServletResponse response);
    RefreshTokenResponse refreshToken(@CookieValue(name = "refreshToken") String refreshToken);
    void logout(LogoutRequest request, HttpServletResponse response);
}
