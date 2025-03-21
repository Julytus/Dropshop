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
public class CartItemResponse {
    @JsonProperty("product_id")
    String productId;

    @JsonProperty("size")
    String size;

    @JsonProperty("color")
    String color;

    @JsonProperty("quantity")
    Integer quantity;
}
