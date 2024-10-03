package com.moreroom.domain.deviceToken.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum DeviceTokneExceptionConstants implements ExceptionConstants {
    DEVICE_TOKEN_NOT_FOUND("DT001", "기기 토큰을 찾을 수 없습니다.");

    private final String code;
    private final String message;
}
