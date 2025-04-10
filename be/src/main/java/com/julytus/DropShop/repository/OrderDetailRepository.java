package com.julytus.DropShop.repository;

import com.julytus.DropShop.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderItem, String> {
}
