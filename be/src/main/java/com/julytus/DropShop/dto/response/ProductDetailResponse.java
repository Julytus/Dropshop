package com.julytus.DropShop.dto.response;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailResponse {
    List<String> colors;
    List<String> sizes;
    String description;
    Float star;
    List<String> thumbnail;
}
