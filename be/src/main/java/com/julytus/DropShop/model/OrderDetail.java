package com.julytus.DropShop.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetail extends AbstractEntity<String> {
    @JoinColumn(name = "order_id")
    @ManyToOne
    Order order;

    @JoinColumn(name = "product_detail_id")
    @ManyToOne
    ProductDetail productDetail;

    @Column(name = "quantity")
    Integer quantity;

    @Column(name = "price")
    Integer price;

    @Column(name = "status")
    String status;
}
