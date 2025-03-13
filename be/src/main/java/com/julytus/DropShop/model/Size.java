package com.julytus.DropShop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Size extends AbstractEntity<String> {
    @Column(name = "name")
    String name;

    @OneToMany(mappedBy = "size")
    Set<ProductDetail> productDetails = new HashSet<>();
}
