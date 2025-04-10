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

    @Column(name = "total_price")
    Float totalPrice;

    @Column(name = "status")
    String status;

    @Column(name = "email_address")
    String emailAddress;

    @Column(name = "phoneNumber")
    String phoneNumber;

    @Column(name = "order_notes", columnDefinition = "TEXT")
    String orderNotes;

    @JoinColumn(name = "address_id")
    @OneToOne
    Address address;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<OrderItem> items = new HashSet<>();
}
