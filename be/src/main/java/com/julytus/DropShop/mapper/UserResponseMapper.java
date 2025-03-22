package com.julytus.DropShop.mapper;

import com.julytus.DropShop.dto.response.UserResponse;
import com.julytus.DropShop.model.User;

public class UserResponseMapper {
    public static UserResponse fromUser(User user) {
        return UserResponse
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole().getName())
                .build();
    }
}
