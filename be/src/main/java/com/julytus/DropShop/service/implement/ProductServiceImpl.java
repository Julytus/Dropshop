package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.annotation.IsAdmin;
import com.julytus.DropShop.dto.request.ProductRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ProductResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.mapper.ProductESMapper;
import com.julytus.DropShop.mapper.ProductResponseMapper;
import com.julytus.DropShop.model.Category;
import com.julytus.DropShop.model.Product;
import com.julytus.DropShop.model.ProductES;
import com.julytus.DropShop.repository.ProductRepository;
import com.julytus.DropShop.service.CategoryService;
import com.julytus.DropShop.service.FileProcessor;
import com.julytus.DropShop.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "PRODUCT-SERVICE")
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final FileProcessor fileProcessor;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final ElasticsearchTemplate elasticsearchTemplate;

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
    public PageResponse<ProductES> search(int page, int limit, String keyword, String category) {
        NativeQuery query;

        if (keyword == null && category == null) {
            query = NativeQuery.builder()
                    .withQuery(q -> q.matchAll(m -> m))
                    .withPageable(PageRequest.of(page - 1, limit))
                    .build();
        } else {
            var boolQuery = NativeQuery.builder();
            var boolQueryBuilder = boolQuery.withQuery(q -> q.bool(b -> {
                if (keyword != null) {
                    b.should(s -> s.match(m -> m
                            .field("name")
                            .query(keyword)
                            .fuzziness("AUTO")
                            .minimumShouldMatch("70%")
                            .boost(2.0F)));
                    
                    b.should(s -> s.wildcard(w -> w
                            .field("name")
                            .value("*" + keyword.toLowerCase() + "*")));
                }
                
                if (category != null) {
                    b.must(m -> m.match(t -> t
                            .field("category")
                            .query(category)));
                }
                
                return b;
            }));
            
            query = boolQueryBuilder
                    .withPageable(PageRequest.of(page - 1, limit))
                    .build();
        }

        SearchHits<ProductES> searchHits = elasticsearchTemplate.search(query, ProductES.class);
        long totalElements = searchHits.getTotalHits();
        
        List<ProductES> productList = searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .collect(java.util.stream.Collectors.toList());

        return PageResponse.<ProductES>builder()
                .currentPage(page)
                .pageSize(limit)
                .totalPages((int) Math.ceil(totalElements / (double) limit))
                .totalElements(totalElements)
                .data(productList)
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

        Product savedProduct = productRepository.save(product);
        kafkaTemplate.send("sync-elastic-search", ProductESMapper.fromProduct(savedProduct));

        return ProductResponseMapper.fromProduct(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(String id, ProductRequest request) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        
        Category category = categoryService.getById(request.getCategoryId());
        
        // Xử lý cập nhật hình ảnh nếu có
        String imageUrl = existingProduct.getImageUrl();
        if (request.getPrimaryImage() != null && !request.getPrimaryImage().isEmpty()) {
            imageUrl = fileProcessor.uploadPrimaryImage(request.getPrimaryImage(), request.getName());
        }
        
        existingProduct.setName(request.getName());
        existingProduct.setCategory(category);
        existingProduct.setPrice(request.getPrice());
        existingProduct.setImageUrl(imageUrl);
        
        Product updatedProduct = productRepository.save(existingProduct);
        
        // Đồng bộ với Elasticsearch
        kafkaTemplate.send("sync-elastic-search", ProductESMapper.fromProduct(updatedProduct));
        
        return ProductResponseMapper.fromProduct(updatedProduct);
    }

    @Override
    @IsAdmin
    public void deleteProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productRepository.delete(product);
        
        // Đồng bộ xóa với Elasticsearch
        kafkaTemplate.send("delete-elastic-search", id);
    }

    @Override
    public ProductResponse getProduct(String id) {
        return ProductResponseMapper.fromProduct(
                productRepository.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND))
        );
    }

    @Override
    public PageResponse<ProductES> searchByCategory(int page, int limit, String category) {
        NativeQuery query;
        
        if (category == null) {
            query = NativeQuery.builder()
                    .withQuery(q -> q.matchAll(m -> m))
                    .withPageable(PageRequest.of(page - 1, limit))
                    .build();
        } else {
            query = NativeQuery.builder()
                    .withQuery(q -> q.match(m -> m
                            .field("category")
                            .query(category)))
                    .withPageable(PageRequest.of(page - 1, limit))
                    .build();
        }

        SearchHits<ProductES> searchHits = elasticsearchTemplate.search(query, ProductES.class);
        long totalElements = searchHits.getTotalHits();
        
        List<ProductES> productList = searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .collect(java.util.stream.Collectors.toList());

        return PageResponse.<ProductES>builder()
                .currentPage(page)
                .pageSize(limit)
                .totalPages((int) Math.ceil(totalElements / (double) limit))
                .totalElements(totalElements)
                .data(productList)
                .build();
    }
}
