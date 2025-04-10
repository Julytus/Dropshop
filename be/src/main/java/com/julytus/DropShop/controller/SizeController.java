package com.julytus.DropShop.controller;

import com.julytus.DropShop.dto.request.SizeRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.model.Size;
import com.julytus.DropShop.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class SizeController {
    private final SizeService sizeService;

    @GetMapping("/size/all")
    ResponseData<PageResponse<Size>> getAll(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        var result = sizeService.getAll(page, limit);

        return ResponseData.<PageResponse<Size>>builder()
                .code(HttpStatus.OK.value())
                .message("Get all size successfully")
                .data(result)
                .build();
    }

    @PostMapping("/size")
    ResponseData<Size> create(@RequestBody SizeRequest request) {
        var result = sizeService.create(request);

        return ResponseData.<Size>builder()
                .code(HttpStatus.CREATED.value())
                .message("create size successfully")
                .data(result)
                .build();
    }

    @GetMapping("/size/{name}")
    ResponseData<Size> get(@PathVariable String name) {
        var result = sizeService.get(name);

        return ResponseData.<Size>builder()
                .code(HttpStatus.OK.value())
                .message("get size")
                .data(result)
                .build();
    }

    @PutMapping("/size/{id}")
    ResponseData<Size> update(
            @PathVariable String id, @RequestBody SizeRequest request) {
        var result = sizeService.update(id, request);

        return ResponseData.<Size>builder()
                .code(HttpStatus.OK.value())
                .message("update size successfully")
                .data(result)
                .build();
    }
}
