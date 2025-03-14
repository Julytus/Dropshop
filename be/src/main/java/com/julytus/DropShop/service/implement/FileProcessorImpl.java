package com.julytus.DropShop.service.implement;

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

import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j(topic = "FILE-PROCESSOR")
@RequiredArgsConstructor
public class FileProcessorImpl implements FileProcessor {
    private final MinioClient minioClient;

    @Value("${minio.avatar-bucket}")
    private String avatarBucket;

    @Value("${minio.book-bucket}")
    private String bookBucket;

    @Value("${minio.url}")
    private String minioUrl;

    @Override
    public String uploadAvatar(MultipartFile file, String username) {
        String fileName = username + "/" + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()))
                + "_" + UUID.randomUUID();

        return uploadImageToMinio(file, avatarBucket, fileName);
    }

    @Override
    public String uploadCoverImage(MultipartFile file, String title) {
        String fileName =title + "/" + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()))
                + "_" + UUID.randomUUID();

        return uploadImageToMinio(file, bookBucket, fileName);
    }

    @Override
    public String uploadChapter(List<MultipartFile> files, String bookName) {
        return "";
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

    private String uploadChapterToMinio(List<MultipartFile> files, String bookTitle) {
        try {
            for (MultipartFile file : files) {
                String fileName = bookTitle + "/" + file.getOriginalFilename();

                validateImageFile(file);

                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(bookBucket)
                                .object(fileName)
                                .stream(file.getInputStream(), file.getSize(), -1)
                                .contentType(file.getContentType())
                                .build()
                );
            }
            // Trả về URL public
            return String.format("%s/%s/%s", minioUrl, bookBucket, bookTitle);
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
}
