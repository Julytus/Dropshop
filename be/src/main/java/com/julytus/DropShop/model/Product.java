package com.julytus.DropShop.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
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
public class Product extends AbstractEntity<String> implements Serializable {
    @Column(name = "name")
    String name;

    @JoinColumn(name = "category_id")
    @ManyToOne
    Category category;

    @Column(name = "image_url")
    String imageUrl;

    @Column(name = "price")
    Float price;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    ProductDetail productDetails;
}
