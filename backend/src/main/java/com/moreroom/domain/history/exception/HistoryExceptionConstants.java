package com.moreroom.domain.history.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HistoryExceptionConstants implements ExceptionConstants {
    HISTORY_NOT_FOUND("H001", "기록을 찾을 수 없습니다");

    private final String code;
    private final String message;
}
