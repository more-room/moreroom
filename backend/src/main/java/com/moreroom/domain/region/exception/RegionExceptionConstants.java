package com.moreroom.domain.region.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum RegionExceptionConstants implements ExceptionConstants {
    REGION_NOT_FOUND("R001", "지역을 찾을 수 없습니다.");

    private final String code;
    private final String message;
}
