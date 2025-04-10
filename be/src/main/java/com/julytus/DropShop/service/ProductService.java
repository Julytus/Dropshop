package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.ProductRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ProductResponse;
import com.julytus.DropShop.model.ProductES;


public interface ProductService {
    PageResponse<ProductResponse> getAllProducts(int page, int limit);
    PageResponse<ProductES> search(int page, int limit, String keyword, String category);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(String id, ProductRequest request);
    void deleteProductById(String id);
    ProductResponse getProduct(String id);
    PageResponse<ProductES> searchByCategory(int page, int limit, String category);
}
