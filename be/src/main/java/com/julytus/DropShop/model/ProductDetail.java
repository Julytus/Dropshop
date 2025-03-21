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
    @OneToOne
    Product product;

    @Column(name = "thumbnail_path")
    String thumbnailPath;

    @ManyToMany
    @JoinTable(
        name = "product_detail_colors",
        joinColumns = @JoinColumn(name = "product_detail_id"),
        inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    Set<Color> colors = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "product_detail_sizes",
        joinColumns = @JoinColumn(name = "product_detail_id"),
        inverseJoinColumns = @JoinColumn(name = "size_id")
    )
    Set<Size> sizes = new HashSet<>();

    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @Column(name = "star")
    Float star;

    @Column(name = "sold_quantity")
    Integer soldQuantity;
}
