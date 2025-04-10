package com.julytus.DropShop.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressResponse {
    @JsonProperty("country")
    String country;

    @JsonProperty("street")
    String street;

    @JsonProperty("city")
    String city;

    @JsonProperty("district")
    String district;

    @JsonProperty("number")
    String number;

    @JsonProperty("zip")
    String zip;
}
