package com.julytus.DropShop.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends AbstractEntity<String> {
    @Column(name = "name")
    String name;

    @JoinColumn(name = "category_id")
    @ManyToOne
    Category category;

    @Column(name = "description")
    String description;

    @Column(name = "image_url")
    String imageUrl;

    @Column(name = "star")
    Float star;

    @Column(name = "price")
    Float price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    Set<ProductDetail> productDetails = new HashSet<>();
}
