package com.julytus.DropShop.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.julytus.DropShop.exception.AppException;
import com.julytus.DropShop.exception.ErrorCode;
import com.julytus.DropShop.service.FileProcessor;

import io.minio.ListObjectsArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.Result;
import io.minio.messages.Item;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j(topic = "FILE-PROCESSOR")
@RequiredArgsConstructor
public class FileProcessorImpl implements FileProcessor {
    private final MinioClient minioClient;

    @Value("${minio.avatar-bucket}")
    private String avatarBucket;

    @Value("${minio.product-bucket}")
    private String productBucket;

    @Value("${minio.url}")
    private String minioUrl;

    @Override
    public String uploadAvatar(MultipartFile file, String username) {
        String fileName = username + "/" + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()))
                + "_" + UUID.randomUUID();

        return uploadImageToMinio(file, avatarBucket, fileName);
    }

    @Override
    public String uploadPrimaryImage(MultipartFile file, String name) {
        String fileName = name + "/" + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()))
                + "_" + UUID.randomUUID();

        return uploadImageToMinio(file, productBucket, fileName);
    }

    @Override
    public String uploadThumbnail(List<MultipartFile> files, String productId) {
        return uploadThumbnailToMinio(files, productId);
    }

    private String uploadImageToMinio(MultipartFile file, String bucket, String fileName) {
        try {
            validateImageFile(file);

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );

            // Trả về URL public
            return String.format("%s/%s/%s", minioUrl, bucket, fileName);
        } catch (Exception e) {
            throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
        }
    }
    @Override
    public List<String> getAllImageUrls(String folderPath) {
        List<String> imageUrls = new ArrayList<>();

        try {
            // Trích xuất folder ID từ URL nếu đang là URL đầy đủ
            String folderId = folderPath;
            if (folderPath.startsWith(minioUrl)) {
                // Lấy chỉ folder ID từ URL (phần cuối cùng của URL)
                String[] parts = folderPath.split("/");
                folderId = parts[parts.length - 1];
            }

            // Liệt kê các objects trong bucket với prefix là folder ID
            Iterable<Result<Item>> results = minioClient.listObjects(
                    ListObjectsArgs.builder()
                            .bucket(productBucket)
                            .prefix(folderId + "/")
                            .recursive(true)
                            .build()
            );

            for (Result<Item> result : results) {
                Item item = result.get();
                String filePath = item.objectName();  // Lấy tên file trong bucket
                String fileUrl = String.format("%s/%s/%s", minioUrl, productBucket, filePath);
                imageUrls.add(fileUrl);
            }
        } catch (Exception e) {
            log.error("Error listing objects in MinIO: {}", e.getMessage(), e);
            throw new RuntimeException("Error listing objects in MinIO: " + e.getMessage(), e);
        }

        return imageUrls;
    }

    private String uploadThumbnailToMinio(List<MultipartFile> files, String productId) {
        try {
            for (MultipartFile file : files) {
                String fileName = productId + "/" + StringUtils.cleanPath(Objects.requireNonNull(
                        file.getOriginalFilename())) + "_" + UUID.randomUUID();

                validateImageFile(file);

                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(productBucket)
                                .object(fileName)
                                .stream(file.getInputStream(), file.getSize(), -1)
                                .contentType(file.getContentType())
                                .build()
                );
            }
            // Trả về URL public
            return String.format("%s/%s/%s", minioUrl, productBucket, productId);
        } catch (Exception e) {
            throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
        }
    }

    private static boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    private static void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.FILE_EMPTY);
        }
        if (!isImageFile(file) || file.getOriginalFilename() == null) {
            throw new AppException(ErrorCode.FILE_INVALID_TYPE);
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new AppException(ErrorCode.FILE_TOO_LARGE);
        }
    }

    @Override
    public void deleteFolder(String folderPath) {
        try {
            // Trích xuất folder ID từ URL nếu đang là URL đầy đủ
            String folderId = folderPath;
            if (folderPath.startsWith(minioUrl)) {
                // Lấy chỉ folder ID từ URL (phần cuối cùng của URL)
                String[] parts = folderPath.split("/");
                folderId = parts[parts.length - 1];
            }

            // Liệt kê tất cả các objects trong thư mục
            Iterable<Result<Item>> results = minioClient.listObjects(
                    ListObjectsArgs.builder()
                            .bucket(productBucket)
                            .prefix(folderId + "/")
                            .recursive(true)
                            .build()
            );

            // Xóa từng object một
            for (Result<Item> result : results) {
                Item item = result.get();
                String objectName = item.objectName();
                
                minioClient.removeObject(
                    RemoveObjectArgs.builder()
                        .bucket(productBucket)
                        .object(objectName)
                        .build()
                );
                
                log.info("Deleted object: {}/{}", productBucket, objectName);
            }
            
            log.info("Successfully deleted folder: {}/{}", productBucket, folderId);
        } catch (Exception e) {
            log.error("Error deleting folder in MinIO: {}", e.getMessage(), e);
            throw new RuntimeException("Error deleting folder in MinIO: " + e.getMessage(), e);
        }
    }
}
