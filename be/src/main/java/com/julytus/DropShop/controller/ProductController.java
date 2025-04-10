package com.julytus.DropShop.controller;

import com.julytus.DropShop.dto.request.ProductRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ProductResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.model.ProductES;
import com.julytus.DropShop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/search-product")
    ResponseData<PageResponse<ProductES>> searchElastic(
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false) String category
    ) {

        var result = productService.search(page, limit, keyword, category);
        return ResponseData.<PageResponse<ProductES>>builder()
                .code(HttpStatus.OK.value())
                .message("Get Products with elastic search")
                .data(result)
                .build();
    }

    @PostMapping(value = "/product", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    ResponseData<ProductResponse> createProduct(
            @ModelAttribute ProductRequest request) {

        ProductResponse result = productService.createProduct(request);
        return ResponseData.<ProductResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create product successfully!")
                .data(result)
                .build();
    }

    @GetMapping("/product")
    ResponseData<PageResponse<ProductResponse>> getAllProduct(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit
    ) {
        var result = productService.getAllProducts(page, limit);
        return ResponseData.<PageResponse<ProductResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Get all product successfully")
                .data(result)
                .build();
    }

    @DeleteMapping("/product/{id}")
    ResponseData<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProductById(id);
        return ResponseData.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Delete product successfully.")
                .build();
    }

    @GetMapping("/product/{id}")
    ResponseData<ProductResponse> getProductById(@PathVariable String id) {
        var result = productService.getProduct(id);
        return ResponseData.<ProductResponse>builder()
                .code(HttpStatus.OK.value())
                .message("get product's info successfully.")
                .data(result)
                .build();
    }

    @PutMapping(value = "/product/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    ResponseData<ProductResponse> updateProduct(
            @PathVariable String id,
            @ModelAttribute ProductRequest request) {

        ProductResponse result = productService.updateProduct(id, request);
        return ResponseData.<ProductResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Update product successfully!")
                .data(result)
                .build();
    }

    @GetMapping("/product/category")
    ResponseData<PageResponse<ProductES>> searchByCategory(
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit,
            @RequestParam(name = "category", required = false) String category
    ) {
        var result = productService.searchByCategory(page, limit, category);
        return ResponseData.<PageResponse<ProductES>>builder()
                .code(HttpStatus.OK.value())
                .message("Get Products by category")
                .data(result)
                .build();
    }
}
