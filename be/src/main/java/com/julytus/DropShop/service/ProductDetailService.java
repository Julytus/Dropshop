package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.ProductDetailRequest;
import com.julytus.DropShop.dto.response.ProductDetailResponse;

public interface ProductDetailService {
    ProductDetailResponse create(ProductDetailRequest request, String productId);
    
    ProductDetailResponse update(String id, ProductDetailRequest request);
    
    void delete(String id);
    
    ProductDetailResponse findByproductId(String productId);
}
