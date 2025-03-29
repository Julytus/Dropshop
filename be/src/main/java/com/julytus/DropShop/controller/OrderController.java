package com.julytus.DropShop.controller;

import com.julytus.DropShop.annotation.IsAdmin;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.julytus.DropShop.annotation.IsUser;
import com.julytus.DropShop.dto.request.OrderRequest;
import com.julytus.DropShop.dto.response.OrderResponse;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/order")
    ResponseData<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        var result = orderService.create(request);
        return ResponseData.<OrderResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create order successfully!")
                .data(result)
                .build();
    }

    @GetMapping("/order")
    @IsUser
    ResponseData<PageResponse<OrderResponse>> getMyOrders(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        var result = orderService.getMyOrders(page, limit);
        return ResponseData.<PageResponse<OrderResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Get orders successfully!")
                .data(result)
                .build();
    }

    @GetMapping("/order-all")
    @IsAdmin
    ResponseData<PageResponse<OrderResponse>> getAllOrders(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        var result = orderService.getAllOrders(page, limit);
        return ResponseData.<PageResponse<OrderResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Get orders successfully!")
                .data(result)
                .build();
    }

    @PutMapping("/order/{orderId}")
    @IsAdmin
    ResponseData<OrderResponse> updateStatus(
            @PathVariable String orderId,
            @RequestBody OrderRequest request
    ) {
        var result = orderService.updateStatus(orderId, request.getStatus());
        return ResponseData.<OrderResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Update order successfully!")
                .data(result)
                .build();
    }

    @GetMapping("/order/{orderId}")
    ResponseData<OrderResponse> getOrderDetail(
            @PathVariable String orderId) {
        var result = orderService.get(orderId);
        return ResponseData.<OrderResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Get order detail successfully!")
                .data(result)
                .build();
    }
} 