package com.julytus.DropShop.mapper;

import com.julytus.DropShop.dto.response.CartItemResponse;
import com.julytus.DropShop.model.OrderItem;

public class CartItemResponseMapper {
    public static CartItemResponse fromOrderItem(OrderItem orderItem) {
        return CartItemResponse.builder()
                .productId(orderItem.getProduct().getId())
                .quantity(orderItem.getQuantity())
                .size(orderItem.getSize())
                .color(orderItem.getColor())
                .build();
    }
} 