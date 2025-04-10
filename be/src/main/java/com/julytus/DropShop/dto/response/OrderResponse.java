package com.julytus.DropShop.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    @JsonProperty("id")
    String id;

    @JsonProperty("address")
    AddressResponse address;

    @JsonProperty("items")
    List<CartItemResponse> items;

    @JsonProperty("email_address")
    String emailAddress;

    @JsonProperty("phone_number")
    String phoneNumber;

    @JsonProperty("status")
    String status;

    @JsonProperty("order_notes")
    String orderNotes;

    @JsonProperty("total_price")
    Float totalPrice;

    @JsonProperty("created_at")
    LocalDateTime createdAt;

    @JsonProperty("updated_at")
    LocalDateTime updatedAt;
}
