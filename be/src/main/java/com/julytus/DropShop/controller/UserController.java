package com.julytus.DropShop.controller;

import com.julytus.DropShop.dto.request.UpdateUserRequest;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.dto.response.UserResponse;
import com.julytus.DropShop.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;

    @PutMapping("/user")
    ResponseData<UserResponse> updateUserProfile(
            @RequestBody @Valid UpdateUserRequest request
    ) {
        var result = userService.updateUserInfo(request);
        return ResponseData.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Update user profile successfully!")
                .data(result)
                .build();
    }

    @PutMapping("/user/avatar")
    ResponseData<UserResponse> updateAvatar(
            @RequestBody MultipartFile file
    ) {
        var result = userService.updateAvatar(file);
        return ResponseData.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Update avatar successfully!")
                .data(result)
                .build();
    }

    @GetMapping("/user")
    ResponseData<UserResponse> fetchProfile() {
        var result = userService.fetchProfile();
        return ResponseData.<UserResponse>builder()
                .code(HttpStatus.OK.value())
                .message("fetch Profile successfully!")
                .data(result)
                .build();
    }
}
