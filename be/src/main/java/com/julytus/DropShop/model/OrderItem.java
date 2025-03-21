package com.julytus.DropShop.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "order_details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItem extends AbstractEntity<String> {
    @JoinColumn(name = "order_id")
    @ManyToOne(fetch = FetchType.LAZY)
    Order order;

    @JoinColumn(name = "product_id")
    @ManyToOne(fetch = FetchType.LAZY)
    Product product;

    @Column(name = "quantity")
    Integer quantity;

    @Column(name = "size")
    String size;

    @Column(name = "color")
    String color;
}
