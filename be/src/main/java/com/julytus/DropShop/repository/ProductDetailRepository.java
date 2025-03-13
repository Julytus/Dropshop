package com.julytus.DropShop.repository;

import com.julytus.DropShop.model.ProductDetail;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, String> {
    List<ProductDetail> findByProductId(Integer productId, Pageable pageable);
}
