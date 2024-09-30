package com.moreroom.domain.cafe.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum CafeExceptionConstants implements ExceptionConstants {
    CAFE_NOT_FOUND("C001", "카페를 찾을 수 없습니다.");

    private final String code;
    private final String message;
}
