package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.dto.request.SizeRequest;
import com.julytus.DropShop.dto.response.PageResponse;
import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.model.Size;
import com.julytus.DropShop.repository.SizeRepository;
import com.julytus.DropShop.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;

    @Override
    public Size create(SizeRequest request) {
        if (sizeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.NAME_EXISTED);
        }

        return sizeRepository.save(
                Size.builder()
                        .name(request.getName())
                        .build()
        );
    }

    @Override
    public Size get(String name) {
        return sizeRepository.findByName(name)
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));
    }

    @Override
    public Size update(String id, SizeRequest request) {
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));

        size.setName(request.getName());

        return sizeRepository.save(size);
    }

    @Override
    public PageResponse<Size> getAll(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Size> sizes = sizeRepository.findAll(pageable);

        return PageResponse.<Size>builder()
                .currentPage(page)
                .pageSize(sizes.getSize())
                .totalPages(sizes.getTotalPages())
                .totalElements(sizes.getTotalElements())
                .data(sizes.getContent())
                .build();
    }
}
