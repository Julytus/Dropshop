package com.julytus.DropShop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.julytus.DropShop.dto.request.ProductDetailRequest;
import com.julytus.DropShop.dto.response.ProductDetailResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.service.ProductDetailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductDetailController {

    private final ProductDetailService productDetailService;

    @PostMapping(value = "/product-detail/{productId}",
                consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    ResponseData<ProductDetailResponse> create(
            @PathVariable String productId,
            @ModelAttribute ProductDetailRequest request) {
        var result = productDetailService.create(request, productId);
        return ResponseData.<ProductDetailResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create product detail successfully!")
                .data(result)
                .build();
    }

    @PutMapping(value = "/product-detail/{id}",
                consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    ResponseData<ProductDetailResponse> update(
            @PathVariable String id,
            @ModelAttribute ProductDetailRequest request) {
        ProductDetailResponse result = productDetailService.update(id, request);
        return ResponseData.<ProductDetailResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Update product detail successfully!")
                .data(result)
                .build();
    }

    @GetMapping("/product-detail/{productId}")
    ResponseData<ProductDetailResponse> findById(@PathVariable String productId) {
        ProductDetailResponse result = productDetailService.findByproductId(productId);
        return ResponseData.<ProductDetailResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Get product detail successfully!")
                .data(result)
                .build();
    }
} 