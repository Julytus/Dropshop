package com.julytus.DropShop.repository;

import com.julytus.DropShop.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findByUser_Email(String userEmail, Pageable pageable);
}
