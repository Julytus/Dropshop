package com.julytus.DropShop.mapper;

import com.julytus.DropShop.model.Product;
import com.julytus.DropShop.model.ProductES;

public class ProductESMapper {
    public static ProductES fromProduct(Product product) {
        return ProductES.builder()
                .id(product.getId())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .name(product.getName())
                .category(product.getCategory().getName())
                .build();
    }
}
