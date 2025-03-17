package com.julytus.DropShop.exception;

import java.net.URI;
import java.time.Instant;
import java.util.List;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.julytus.DropShop.dto.response.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalHandlingException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception, HttpServletRequest request) {

        BindingResult bindingResult = exception.getBindingResult();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        List<String> errors = fieldErrors.stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error(errors.size() > 1 ? String.valueOf(errors) : errors.getFirst())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(errorResponse);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ProblemDetail> handleIdentityException(AppException exception, HttpServletRequest request) {

        ProblemDetail problemDetail =  ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, exception.getMessage());
        problemDetail.setTitle("Error");
        problemDetail.setType(URI.create(request.getRequestURI()));
        problemDetail.setInstance(URI.create(request.getRequestURI()));
        problemDetail.setProperty("errors", List.of(exception.getMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problemDetail);
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleJwtAuthenticationException(
            JwtAuthenticationException exception, HttpServletRequest request) {

        ErrorCode errorCode = exception.getErrorCode();
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(Instant.now())
                .status(errorCode.getCode())
                .error(errorCode.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatus()).body(errorResponse);
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ErrorResponse> handleSecurityException(
            SecurityException exception, HttpServletRequest request) {

        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .error("Security error: " + exception.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
}
