package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.annotation.IsAdmin;
import com.julytus.DropShop.dto.request.ProductDetailRequest;
import com.julytus.DropShop.dto.response.ProductDetailResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.mapper.ProductDetailMapper;
import com.julytus.DropShop.model.Color;
import com.julytus.DropShop.model.Product;
import com.julytus.DropShop.model.ProductDetail;
import com.julytus.DropShop.model.Size;
import com.julytus.DropShop.repository.ColorRepository;
import com.julytus.DropShop.repository.ProductDetailRepository;
import com.julytus.DropShop.repository.ProductRepository;
import com.julytus.DropShop.repository.SizeRepository;
import com.julytus.DropShop.service.FileProcessor;
import com.julytus.DropShop.service.ProductDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductDetailServiceImpl implements ProductDetailService {
    
    private final ProductDetailRepository productDetailRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    private final ProductDetailMapper productDetailMapper;
    private final FileProcessor fileProcessor;

    @Override
    @Transactional
    @IsAdmin
    public ProductDetailResponse create(ProductDetailRequest request, String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        List<Color> colors = colorRepository.findAllById(request.getColorIds());
        List<Size> sizes = sizeRepository.findAllById(request.getSizeIds());
        String thumbnailPath = "";
        if(request.getThumbnails() != null) {
            thumbnailPath = fileProcessor.uploadThumbnail(request.getThumbnails(), productId);
        }

        ProductDetail productDetail = ProductDetail.builder()
                .product(product)
                .colors(new HashSet<>(colors))
                .sizes(new HashSet<>(sizes))
                .description(request.getDescription())
                .thumbnailPath(thumbnailPath)
                .build();

        return productDetailMapper.toResponse(productDetailRepository.save(productDetail));
    }

    @Override
    @Transactional
    @IsAdmin
    public ProductDetailResponse update(String productId, ProductDetailRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        ProductDetail productDetail = product.getProductDetails();

        List<Color> colors = colorRepository.findAllById(request.getColorIds());
        List<Size> sizes = sizeRepository.findAllById(request.getSizeIds());
        String thumbnailPath = "";
        if(request.getThumbnails() != null) {
            fileProcessor.deleteFolder(productDetail.getThumbnailPath());
            thumbnailPath = fileProcessor.uploadThumbnail(request.getThumbnails(), productId);
        }

        productDetail.setColors(new HashSet<>(colors));
        productDetail.setSizes(new HashSet<>(sizes));
        productDetail.setDescription(request.getDescription());
        productDetail.setThumbnailPath(thumbnailPath);
        return productDetailMapper.toResponse(productDetailRepository.save(productDetail));
    }

    @Override
    @Transactional
    public void delete(String id) {
        productDetailRepository.deleteById(id);
    }

    @Override
    public ProductDetailResponse findByproductId(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return productDetailMapper.toResponse(product.getProductDetails());
    }
} 