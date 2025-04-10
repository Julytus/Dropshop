package com.julytus.DropShop.repository;
import com.julytus.DropShop.model.ProductES;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductESRepository extends ElasticsearchRepository<ProductES, String> {
}
