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
public class Address extends AbstractEntity<String> {

    @Column(name = "number")
    String number;

    @Column(name = "street")
    String street;

    @Column(name = "ward")
    String ward;

    @Column(name = "district")
    String district;

    @Column(name = "city")
    String city;

    @OneToOne(mappedBy = "address", fetch = FetchType.EAGER)
    Order order;
}
