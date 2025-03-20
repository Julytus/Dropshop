package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.ProductRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ProductResponse;


public interface ProductService {
    PageResponse<ProductResponse> getAllProducts(int page, int limit);

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(String id, ProductRequest request);

    void deleteProductById(String id);

    ProductResponse getProduct(String id);
}
