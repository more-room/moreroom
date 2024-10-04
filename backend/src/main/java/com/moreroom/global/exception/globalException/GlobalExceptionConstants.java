package com.moreroom.global.exception.globalException;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GlobalExceptionConstants implements ExceptionConstants {
    DATETIME_INVALID("G001", "날짜 형식이 잘못되었습니다"),
    JSON_SERIALIZATION_ERROR("G002", "json 직렬화/역직렬화 실패");

    private final String code;
    private final String message;
}
