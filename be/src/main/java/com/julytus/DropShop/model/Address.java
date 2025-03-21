package com.julytus.DropShop.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "addresses")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Address extends AbstractEntity<String> {
    @Column(name = "country")
    String country;

    @Column(name = "street_address")
    String street;

    @Column(name = "city")
    String city;

    @Column(name = "district")
    String district;

    @Column(name = "number")
    String number;

    @Column(name = "zip")
    String zip;
}
