package com.julytus.DropShop.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailRequest {
    String color;

    String size;

    String description;

    Integer stockQuantity;
}
