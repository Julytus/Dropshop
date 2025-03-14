package com.julytus.DropShop.service;

import com.julytus.DropShop.model.User;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface JwtService {
    String generateAccessToken(User user);
    String generateRefreshToken(User user);
    String extractUsername(String accessToken);
    boolean verificationToken(String token, String secretKey) throws ParseException, JOSEException;
    boolean inBlackList(String token);
    long extractTokenExpired(String token);
}
