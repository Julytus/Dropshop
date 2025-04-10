package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.SignUpRequest;
import com.julytus.DropShop.dto.request.UpdateUserRequest;
import com.julytus.DropShop.dto.response.UserResponse;
import com.julytus.DropShop.model.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserResponse createUser(SignUpRequest request);
    UserResponse updateUserInfo(UpdateUserRequest request);
    UserResponse updateAvatar(MultipartFile file);
    User findByUsername(String email);
    UserResponse fetchProfile();
}
