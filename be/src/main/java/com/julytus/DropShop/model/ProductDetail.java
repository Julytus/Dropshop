package com.julytus.DropShop.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetail extends AbstractEntity<String> {
    @JoinColumn(name = "product_id")
    @ManyToOne
    Product product;

    @Column(name = "thumbnail_path")
    String thumbnailPath;

    @JoinColumn(name = "color_id")
    @ManyToOne
    Color color;

    @JoinColumn(name = "size_id")
    @ManyToOne
    Size size;

    @Column(name = "description")
    String description;

    @Column(name = "star")
    Float star;

    @Column(name = "stock_quantity")
    Integer stockQuantity;

    @Column(name = "sold_quantity")
    Integer soldQuantity;

    @OneToMany(mappedBy = "productDetail", cascade = CascadeType.ALL)
    Set<OrderDetail> orderDetails = new HashSet<>();
}
