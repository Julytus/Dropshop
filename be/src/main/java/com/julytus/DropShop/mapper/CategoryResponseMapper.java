package com.julytus.DropShop.mapper;

import com.julytus.DropShop.dto.response.CategoryResponse;
import com.julytus.DropShop.model.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public class CategoryResponseMapper {
    public static CategoryResponse fromCategory(Category category) {
        return CategoryResponse
                .builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    public static List<CategoryResponse> fromPageCategory(Page<Category> categories) {
        return categories.getContent().stream()
                .map(CategoryResponseMapper::fromCategory)
                .toList();
    }
}
