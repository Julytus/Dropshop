package com.julytus.DropShop.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    List<CartItem> cartItems;
    AddressRequest addressRequest;
    String emailAddress;
    String phoneNumber;
    String orderNotes;
    String token;
}
