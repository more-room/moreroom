package com.moreroom.domain.playLog.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlayLogExceptionConstants implements ExceptionConstants {
    PLAYLOG_NOT_FOUND("P001", "플레이 기록이 없습니다."),
    PLAYLOG_INVALID_VALUE("P002", "부적합한 플레이 기록 데이터입니다.");

    private final String code;
    private final String message;
}
