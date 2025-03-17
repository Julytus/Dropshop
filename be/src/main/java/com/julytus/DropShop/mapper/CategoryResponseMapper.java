package com.julytus.DropShop.mapper;

import com.julytus.DropShop.dto.response.CategoryResponse;
import com.julytus.DropShop.model.Category;

public class CategoryResponseMapper {
    public static CategoryResponse fromCategory(Category category) {
        return CategoryResponse
                .builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
