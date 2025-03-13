package com.julytus.DropShop.repository;

import com.julytus.DropShop.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SizeRepository extends JpaRepository<Size, String> {
    Optional<Size> findByName(String name);
}
