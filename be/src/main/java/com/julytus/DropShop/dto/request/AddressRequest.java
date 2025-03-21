package com.julytus.DropShop.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressRequest {
    String country;
    String street;
    String city;
    String district;
    String number;
    String zip;
}
