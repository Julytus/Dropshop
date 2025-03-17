package com.julytus.DropShop.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileProcessor {
    String uploadAvatar(MultipartFile file, String username);
    String uploadPrimaryImage(MultipartFile file, String nameProduct);
    String uploadThumbnail(List<MultipartFile> files, String bookName);
}
