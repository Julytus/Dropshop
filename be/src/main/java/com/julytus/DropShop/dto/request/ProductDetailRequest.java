package com.julytus.DropShop.dto.request;

import java.util.List;

import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailRequest {
    List<String> colorIds;
    List<String> sizeIds;
    String description;
    List<MultipartFile> thumbnails;
}
