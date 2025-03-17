package com.julytus.DropShop.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    @NotBlank(message = "name cannot be blank")
    String name;

    @NotBlank(message = "Category Id cannot be blank")
    String categoryId;

    @NotNull(message = "Price cannot be null")
    Float price;

    MultipartFile primaryImage;
}
