package com.julytus.DropShop.controller;

import com.julytus.DropShop.dto.request.CategoryRequest;
import com.julytus.DropShop.dto.response.CategoryResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/category")
    ResponseData<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        var result = categoryService.createCategory(request);
        return ResponseData.<CategoryResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create category successfully!")
                .data(result)
                .build();
    }

    @PutMapping("/category/{id}")
    ResponseData<CategoryResponse> updateCategory(@RequestBody CategoryRequest request,
                                                  @PathVariable String id) {
        var result = categoryService.updateCategory(request, id);
        return ResponseData.<CategoryResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Update category successfully!")
                .data(result)
                .build();
    }

    @DeleteMapping("/category/{id}")
    ResponseData<Void> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseData.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("delete category successfully!")
                .build();
    }
}
