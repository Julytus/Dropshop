package com.julytus.DropShop.configuration;

import java.util.Collections;

import com.julytus.DropShop.service.UserService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component("userDetailsService")
@RequiredArgsConstructor
@Slf4j
public class UserDetailCustom implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.julytus.DropShop.model.User user = userService.findByUsername(username);

        return new User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole().getName())));
    }
}