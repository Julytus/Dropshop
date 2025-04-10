package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.ColorRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.model.Color;

public interface ColorService {
    Color create(ColorRequest request);
    Color get(String name);
    Color update(String id, ColorRequest request);
    PageResponse<Color> getAll(int page, int limit);
}
