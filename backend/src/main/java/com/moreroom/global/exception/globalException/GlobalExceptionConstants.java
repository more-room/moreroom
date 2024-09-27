package com.moreroom.global.exception.globalException;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GlobalExceptionConstants implements ExceptionConstants {
    DATETIME_INVALID("G001", "날짜 형식이 잘못되었습니다");

    private final String code;
    private final String message;
}
