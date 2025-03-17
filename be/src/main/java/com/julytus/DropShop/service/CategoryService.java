package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.CategoryRequest;
import com.julytus.DropShop.dto.response.CategoryResponse;
import com.julytus.DropShop.model.Category;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    Category getById(String id);
}
