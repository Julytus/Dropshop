package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.annotation.IsAdmin;
import com.julytus.DropShop.dto.request.ColorRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.mapper.CategoryResponseMapper;
import com.julytus.DropShop.model.Color;
import com.julytus.DropShop.repository.ColorRepository;
import com.julytus.DropShop.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;

    @Override
    @IsAdmin
    public Color create(ColorRequest request) {
        if (colorRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.NAME_EXISTED);
        }

        return colorRepository.save(
                Color.builder()
                        .colorCode(request.getColorCode())
                        .name(request.getName())
                        .build()
        );
    }

    @Override
    public Color get(String name) {
        return colorRepository.findByName(name)
                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));
    }

    @Override
    @IsAdmin
    public Color update(String id, ColorRequest request) {
        Color color = colorRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));

        color.setName(request.getName());
        color.setColorCode(request.getColorCode());

        return colorRepository.save(color);
    }

    @Override
    public PageResponse<Color> getAll(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Color> colors = colorRepository.findAll(pageable);

        return PageResponse.<Color>builder()
                .currentPage(page)
                .pageSize(colors.getSize())
                .totalPages(colors.getTotalPages())
                .totalElements(colors.getTotalElements())
                .data(colors.getContent())
                .build();
    }
}
