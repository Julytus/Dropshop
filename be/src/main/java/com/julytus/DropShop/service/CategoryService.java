package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.CategoryRequest;
import com.julytus.DropShop.dto.response.CategoryResponse;
import com.julytus.DropShop.model.Category;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    CategoryResponse updateCategory(CategoryRequest request, String id);
    void deleteCategory(String id);
    Category getById(String id);
}
