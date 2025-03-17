package com.julytus.DropShop.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CategoryRequest {
    @NotBlank(message = "name cannot be blank")
    private String name;
}
