package com.julytus.DropShop.controller;

import com.julytus.DropShop.annotation.IsAdmin;
import com.julytus.DropShop.dto.request.CategoryRequest;
import com.julytus.DropShop.dto.response.CategoryResponse;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.model.Category;
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
    @IsAdmin
    ResponseData<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        var result = categoryService.createCategory(request);
        return ResponseData.<CategoryResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create category successfully!")
                .data(result)
                .build();
    }

    @PutMapping("/category/{id}")
    @IsAdmin
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
    @IsAdmin
    ResponseData<Void> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseData.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("delete category successfully!")
                .build();
    }

    @GetMapping("/category/all")
    ResponseData<PageResponse<CategoryResponse>> getCategoryById(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        var result = categoryService.getAll(page, limit);

        return ResponseData.<PageResponse<CategoryResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Get all category successfully")
                .data(result)
                .build();
    }

    @GetMapping("/category/{id}")
    ResponseData<Category> getCategoryById(
            @PathVariable String id) {
        var result = categoryService.getById(id);

        return ResponseData.<Category>builder()
                .code(HttpStatus.OK.value())
                .message("Get category successfully")
                .data(result)
                .build();
    }
}
