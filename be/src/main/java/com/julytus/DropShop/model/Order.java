package com.julytus.DropShop.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order extends AbstractEntity<String> {
    @JoinColumn(name = "user_id")
    @ManyToOne
    User user;

    @JoinColumn(name = "address_id")
    @OneToOne
    Address address;

    @Column(name = "title")
    String title;

    @Column(name = "total_price")
    Integer totalPrice;

    @Column(name = "status")
    String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    Set<OrderDetail> orderDetails = new HashSet<>();
}
