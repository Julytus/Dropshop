package com.julytus.DropShop.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface FileProcessor {
    String uploadAvatar(MultipartFile file, String username);
    String uploadPrimaryImage(MultipartFile file, String name);
    String uploadThumbnail(List<MultipartFile> files, String productId);
    List<String> getAllImageUrls(String folderPath);
    void deleteFolder(String folderPath);
}
