package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.dto.request.CategoryRequest;
import com.julytus.DropShop.dto.response.CategoryResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.mapper.CategoryResponseMapper;
import com.julytus.DropShop.model.Category;
import com.julytus.DropShop.repository.CategoryRepository;
import com.julytus.DropShop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.NAME_EXISTED);
        }

        return CategoryResponseMapper.fromCategory(
                categoryRepository.save(
                Category.builder()
                        .name( request.getName() )
                        .build())
        );
    }

    @Override
    public CategoryResponse updateCategory(CategoryRequest request, String id) {
        Category category = getById(id);
        category.setName(request.getName());
        return CategoryResponseMapper.fromCategory(
                categoryRepository.save(category)
        );
    }

    @Override
    public void deleteCategory(String id) {
        Category category = getById(id);
        categoryRepository.delete(category);
    }

    @Override
    public Category getById(String id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
    }
}
