package com.julytus.DropShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.julytus.DropShop.model.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size, String> {
} 