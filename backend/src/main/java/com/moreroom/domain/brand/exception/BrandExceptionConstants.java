package com.moreroom.domain.brand.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BrandExceptionConstants implements ExceptionConstants {
    BRAND_NOT_FOUND("B001", "브랜드를 찾을 수 없습니다.");

    private final String code;
    private final String message;

}
