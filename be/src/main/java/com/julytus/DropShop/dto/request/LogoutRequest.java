package com.julytus.DropShop.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
public class LogoutRequest implements Serializable {

    @NotBlank(message = "Token cannot be null")
    String accessToken;
}
