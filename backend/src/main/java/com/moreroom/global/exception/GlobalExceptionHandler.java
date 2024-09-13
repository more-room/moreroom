package com.moreroom.global.exception;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({CustomException.class})
    public ResponseEntity<Map<String, String>> customExceptionHandler(CustomException e) {
        ExceptionConstants ec = e.getConstants();

        // Map 객체 생성하여 에러 코드와 메시지 저장
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("code", ec.getCode());
        errorResponse.put("message", ec.getMessage());

        // 응답으로 Map과 함께 HttpStatus 반환
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Field 에러의 defaultMessage만 추출하여 Map으로 변환
        Map<String, String> errors = ex.getBindingResult().getFieldErrors()
            .stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                DefaultMessageSourceResolvable::getDefaultMessage
            ));

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
