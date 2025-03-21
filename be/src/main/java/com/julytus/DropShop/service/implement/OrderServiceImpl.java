package com.julytus.DropShop.service.implement;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.julytus.DropShop.annotation.IsUser;
import com.julytus.DropShop.common.OrderStatus;
import com.julytus.DropShop.dto.request.OrderRequest;
import com.julytus.DropShop.dto.response.OrderResponse;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.mapper.OrderResponseMapper;
import com.julytus.DropShop.model.Address;
import com.julytus.DropShop.model.Order;
import com.julytus.DropShop.model.OrderItem;
import com.julytus.DropShop.model.Product;
import com.julytus.DropShop.model.User;
import com.julytus.DropShop.repository.OrderRepository;
import com.julytus.DropShop.repository.ProductRepository;
import com.julytus.DropShop.service.AddressService;
import com.julytus.DropShop.service.OrderService;
import com.julytus.DropShop.service.UserService;
import com.julytus.DropShop.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final AddressService addressService;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserService userService;

    @Override
    @Transactional
    public OrderResponse create(OrderRequest request) {
        // Tạo địa chỉ mới
        Address address = addressService.create(request.getAddressRequest());

        Set<OrderItem> orderItems = new HashSet<>();
        float totalPrice = 0;

        Order order = Order.builder()
                .address(address)
                .totalPrice(0f)
                .status(OrderStatus.PENDING)
                .emailAddress(request.getEmailAddress())
                .phoneNumber(request.getPhoneNumber())
                .orderNotes(request.getOrderNotes())
                .build();

        // Set user nếu có token
        if(request.getToken() != null) {
            String username = SecurityUtil.getCurrentLogin()
                    .orElse(null);
            User user = userService.findByUsername(username);
            order.setUser(user);
        }

        // Tạo và thêm các order items
        for (var cartItem : request.getCartItems()) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .size(cartItem.getSize())
                    .color(cartItem.getColor())
                    .build();

            orderItems.add(orderItem);
            totalPrice += (product.getPrice() * cartItem.getQuantity());
        }

        order.setTotalPrice(totalPrice);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        return OrderResponseMapper.fromOrder(savedOrder);
    }

    @Override
    public OrderResponse get(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return OrderResponseMapper.fromOrder(order);
    }

    @Override
    @IsUser
    public PageResponse<OrderResponse> getMyOrders(int page, int limit) {
        String username = SecurityUtil.getCurrentLogin()
                .orElseThrow(() -> new AppException(ErrorCode.ACCESS_DINED));

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Order> orderPage = orderRepository.findByUser_Email(username, pageable);

        return PageResponse.<OrderResponse>builder()
                .currentPage(page)
                .pageSize(orderPage.getSize())
                .totalPages(orderPage.getTotalPages())
                .totalElements(orderPage.getTotalElements())
                .data(OrderResponseMapper.fromPageOrder(orderPage))
                .build();
    }
}
