package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.common.PredefinedRole;
import com.julytus.DropShop.common.UserStatus;
import com.julytus.DropShop.dto.request.SignUpRequest;
import com.julytus.DropShop.dto.request.UpdateUserRequest;
import com.julytus.DropShop.dto.response.UserResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.exception.JwtAuthenticationException;
import com.julytus.DropShop.mapper.UserResponseMapper;
import com.julytus.DropShop.model.Role;
import com.julytus.DropShop.model.User;
import com.julytus.DropShop.repository.RoleRepository;
import com.julytus.DropShop.repository.UserRepository;
import com.julytus.DropShop.service.FileProcessor;
import com.julytus.DropShop.service.UserService;
import com.julytus.DropShop.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "USER-SERVICE")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileProcessor fileProcessor;

    @Value("${image.avatar-default}")
    private String avatarDefault;

    @Override
    public UserResponse createUser(SignUpRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            log.error("User already exists {}", request.getEmail());
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        Role role = roleRepository.findByName(PredefinedRole.USER)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));

        User user = User.builder()
                .email(request.getEmail())
                .fullName(request.getFullName())
                .password(passwordEncoder.encode(request.getPassword()))
                .userStatus(UserStatus.ACTIVE)
                .role(role)
                .avatarUrl(avatarDefault)
                .build();

        return UserResponseMapper.fromUser(userRepository.save(user));
    }

    @Override
    public UserResponse updateUserInfo(UpdateUserRequest request) {
        String username = SecurityUtil.getCurrentLogin()
                .orElseThrow(() -> new JwtAuthenticationException(ErrorCode.ACCESS_DINED));
        User user = findByUsername(username);

        user.setBirthday(request.getBirthday());
        user.setPhoneNumber(request.getPhoneNumber());

        return UserResponseMapper.fromUser(userRepository.save(user));
    }

    @Override
    public UserResponse updateAvatar(MultipartFile file) {
        String username = SecurityUtil.getCurrentLogin()
                .orElseThrow(() -> new JwtAuthenticationException(ErrorCode.ACCESS_DINED));

        User user = findByUsername(username);
        String avatarUrl = fileProcessor.uploadAvatar(file, username);
        user.setAvatarUrl(avatarUrl);

        return UserResponseMapper.fromUser(userRepository.save(user));
    }

    @Override
    public User findByUsername(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @Override
    public UserResponse fetchProfile() {
        String username = SecurityUtil.getCurrentLogin()
                .orElseThrow(() -> new JwtAuthenticationException(ErrorCode.ACCESS_DINED));

        return UserResponseMapper.fromUser(
                userRepository.findByEmail(username)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }
}
