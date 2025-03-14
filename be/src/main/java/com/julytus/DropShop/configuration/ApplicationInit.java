package com.julytus.DropShop.configuration;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.julytus.DropShop.common.PredefinedRole;
import com.julytus.DropShop.model.Role;
import com.julytus.DropShop.repository.RoleRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInit {
    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(RoleRepository roleRepository) {
        log.info("Initializing application..............");
        return args -> {
            if (roleRepository.count() == 0) {
                Role adminRole = Role.builder()
                    .name(PredefinedRole.ADMIN)
                    .build();
                Role userRole = Role.builder()
                    .name(PredefinedRole.USER)
                    .build();
                roleRepository.save(adminRole);
                roleRepository.save(userRole);
            }
            log.info("JulyTus: Application initialization completed");
        };
    }
}
