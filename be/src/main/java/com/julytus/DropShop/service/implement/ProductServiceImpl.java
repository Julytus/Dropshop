package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.annotation.IsAdmin;
import com.julytus.DropShop.dto.request.ProductRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ProductResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.mapper.ProductResponseMapper;
import com.julytus.DropShop.model.Category;
import com.julytus.DropShop.model.Product;
import com.julytus.DropShop.repository.ProductRepository;
import com.julytus.DropShop.service.CategoryService;
import com.julytus.DropShop.service.FileProcessor;
import com.julytus.DropShop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final FileProcessor fileProcessor;

    @Override
    public PageResponse<ProductResponse> getAllProducts(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Product> products = productRepository.findAll(pageable);

        return PageResponse.<ProductResponse>builder()
                .currentPage(page)
                .pageSize(products.getSize())
                .totalPages(products.getTotalPages())
                .totalElements(products.getTotalElements())
                .data(ProductResponseMapper.fromPageProduct(products))
                .build();
    }

    @Override
    @IsAdmin
//    @Transactional(rollbackFor = Exception.class)
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryService.getById(request.getCategoryId());

        String imageUrl = fileProcessor.uploadPrimaryImage(request.getPrimaryImage(), request.getName());
        Product product = Product
                .builder()
                .name(request.getName())
                .category(category)
                .price(request.getPrice())
                .imageUrl(imageUrl)
                .build();
        return ProductResponseMapper.fromProduct(productRepository.save(product));
    }

    @Override
    public ProductResponse updateProduct(String id, ProductRequest request) {
        return null;
    }

    @Override
    @IsAdmin
    public void deleteProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productRepository.delete(product);
    }
}
