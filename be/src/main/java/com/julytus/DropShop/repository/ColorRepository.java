package com.julytus.DropShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.julytus.DropShop.model.Color;

@Repository
public interface ColorRepository extends JpaRepository<Color, String> {
} 