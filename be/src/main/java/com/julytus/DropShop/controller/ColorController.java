package com.julytus.DropShop.controller;

import com.julytus.DropShop.dto.request.ColorRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.dto.response.ResponseData;
import com.julytus.DropShop.model.Color;
import com.julytus.DropShop.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ColorController {
    private final ColorService colorService;

    @GetMapping("/color/all")
    ResponseData<PageResponse<Color>> getAll(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        var result = colorService.getAll(page, limit);

        return ResponseData.<PageResponse<Color>>builder()
                .code(HttpStatus.OK.value())
                .message("Get all color successfully")
                .data(result)
                .build();
    }

    @PostMapping("/color")
    ResponseData<Color> create(@RequestBody ColorRequest request) {
        var result = colorService.create(request);

        return ResponseData.<Color>builder()
                .code(HttpStatus.CREATED.value())
                .message("create color successfully")
                .data(result)
                .build();
    }

    @GetMapping("/color/{name}")
    ResponseData<Color> get(@PathVariable String name) {
        var result = colorService.get(name);

        return ResponseData.<Color>builder()
                .code(HttpStatus.OK.value())
                .message("get color")
                .data(result)
                .build();
    }

    @PutMapping("/color/{id}")
    ResponseData<Color> update(
            @PathVariable String id, @RequestBody ColorRequest request) {
        var result = colorService.update(id, request);

        return ResponseData.<Color>builder()
                .code(HttpStatus.OK.value())
                .message("update color successfully")
                .data(result)
                .build();
    }
}
