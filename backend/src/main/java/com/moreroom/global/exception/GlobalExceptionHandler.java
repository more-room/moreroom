package com.moreroom.global.exception;

import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
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

}
