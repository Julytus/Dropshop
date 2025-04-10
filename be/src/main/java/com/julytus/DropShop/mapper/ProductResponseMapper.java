package com.julytus.DropShop.mapper;

import com.julytus.DropShop.dto.response.ProductResponse;
import com.julytus.DropShop.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public class ProductResponseMapper {
    public static ProductResponse fromProduct(Product product) {
        return ProductResponse
                .builder()
                .id(product.getId())
                .category(product.getCategory().getName())
                .imageUrl(product.getImageUrl())
                .price(product.getPrice())
                .name(product.getName())
                .build();
    }

    public static List<ProductResponse> fromPageProduct(Page<Product> products) {
        return products.getContent().stream()
                .map(ProductResponseMapper::fromProduct)
                .toList();
    }
}
