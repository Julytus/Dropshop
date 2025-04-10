package com.julytus.DropShop.sync;

import com.julytus.DropShop.model.ProductES;
import com.julytus.DropShop.repository.ProductESRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "SYNC-DB")
public class SyncElasticSearch {
    private final ProductESRepository productESRepository;

    @KafkaListener(topics = "sync-elastic-search", groupId = "product-elastic-search")
    public void saveProductToES(ProductES productES) {
        try {
            if(productES != null) {
                productESRepository.save(productES);
                log.info("Saved/Updated product to elasticsearch success: {}", productES.getId());
            } else {
                log.error("Saving productES to elasticsearch failed: null object");
            }
        } catch (Exception e) {
            log.error("Error while saving productES to Elasticsearch: {}", e.getMessage());
            throw e;
        }
    }

    @KafkaListener(topics = "delete-elastic-search", groupId = "product-elastic-search")
    public void deleteProductFromES(String productId) {
        try {
            if (productId != null && productESRepository.existsById(productId)) {
                productESRepository.deleteById(productId);
                log.info("Deleted product from elasticsearch success: {}", productId);
            } else {
                log.warn("Delete productES from elasticsearch skipped: product not found with id {}", productId);
            }
        } catch (Exception e) {
            log.error("Error while deleting productES from Elasticsearch: {}", e.getMessage());
            throw e;
        }
    }
}
