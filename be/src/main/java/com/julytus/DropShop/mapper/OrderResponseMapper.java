package com.julytus.DropShop.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import com.julytus.DropShop.dto.response.AddressResponse;
import com.julytus.DropShop.dto.response.OrderResponse;
import com.julytus.DropShop.model.Order;

public class OrderResponseMapper {
    public static OrderResponse fromOrder(Order order) {
        return OrderResponse.builder()
                .address(AddressResponse.builder()
                        .country(order.getAddress().getCountry())
                        .street(order.getAddress().getStreet())
                        .city(order.getAddress().getCity())
                        .district(order.getAddress().getDistrict())
                        .number(order.getAddress().getNumber())
                        .zip(order.getAddress().getZip())
                        .build())
                .id(order.getId())
                .status(order.getStatus())
                .emailAddress(order.getEmailAddress())
                .phoneNumber(order.getPhoneNumber())
                .totalPrice(order.getTotalPrice())
                .orderNotes(order.getOrderNotes())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .items(order.getItems().stream()
                        .map(CartItemResponseMapper::fromOrderItem)
                        .collect(Collectors.toList()))
                .build();
    }

    public static List<OrderResponse> fromPageOrder(Page<Order> orders) {
        return orders.getContent().stream()
                .map(OrderResponseMapper::fromOrder)
                .toList();
    }
} 