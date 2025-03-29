package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.OrderRequest;
import com.julytus.DropShop.dto.response.OrderResponse;
import com.julytus.DropShop.dto.response.PageResponse;

public interface OrderService {
    OrderResponse create(OrderRequest request);
    OrderResponse get(String orderId);
    OrderResponse updateStatus(String orderId, String status);
    PageResponse<OrderResponse> getMyOrders(int page, int limit);
    PageResponse<OrderResponse> getAllOrders(int page, int limit);
}
