package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.SizeRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.model.Size;

public interface SizeService {
    Size create(SizeRequest request);
    Size get(String name);
    Size update(String id, SizeRequest request);
    PageResponse<Size> getAll(int page, int limit);
}
