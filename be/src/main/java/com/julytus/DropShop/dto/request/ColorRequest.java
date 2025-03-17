package com.julytus.DropShop.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ColorRequest {
    @NotBlank(message = "name cannot be blank")
    private String name;
}
