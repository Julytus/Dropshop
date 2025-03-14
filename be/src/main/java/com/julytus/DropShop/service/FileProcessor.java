package com.julytus.DropShop.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileProcessor {
    String uploadAvatar(MultipartFile file, String username);
    String uploadCoverImage(MultipartFile file, String title);
    String uploadChapter(List<MultipartFile> files, String bookName);
}
