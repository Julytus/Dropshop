package com.julytus.DropShop.mapper;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import com.julytus.DropShop.service.FileProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import com.julytus.DropShop.dto.request.ProductDetailRequest;
import com.julytus.DropShop.dto.response.ProductDetailResponse;
import com.julytus.DropShop.model.Color;
import com.julytus.DropShop.model.Product;
import com.julytus.DropShop.model.ProductDetail;
import com.julytus.DropShop.model.Size;

@Component
@RequiredArgsConstructor
public class ProductDetailMapper {
    private final FileProcessor fileProcessor;
    
//    public ProductDetail toEntity(
//            ProductDetailRequest request, Product product, List<Color> colors, List<Size> sizes, String thumbnailPath) {
//        return ProductDetail.builder()
//                .product(product)
//                .colors(new HashSet<>(colors))
//                .sizes(new HashSet<>(sizes))
//                .description(request.getDescription())
//                .thumbnailPath(thumbnailPath)
//                .build();
//    }

    public ProductDetailResponse toResponse(ProductDetail entity) {
        ProductDetailResponse response = new ProductDetailResponse();
        response.setColors(entity.getColors().stream()
                .map(Color::getColorCode)
                .collect(Collectors.toList()));
        response.setSizes(entity.getSizes().stream()
                .map(Size::getName)
                .collect(Collectors.toList()));
        response.setDescription(entity.getDescription());
        response.setStar(entity.getStar());
        response.setThumbnail(fileProcessor.getAllImageUrls(entity.getThumbnailPath()));
        return response;
    }
}
