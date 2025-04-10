package com.julytus.DropShop.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class AbstractEntity<T extends Serializable> implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    T id;

    @CreationTimestamp
    LocalDateTime createdAt;

    @UpdateTimestamp
    LocalDateTime updatedAt;
}
