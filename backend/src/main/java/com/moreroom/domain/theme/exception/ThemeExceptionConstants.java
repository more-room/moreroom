package com.moreroom.domain.theme.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ThemeExceptionConstants implements ExceptionConstants {
    THEME_NOT_FOUND("T001", "테마를 찾을 수 없습니다.");

    private final String code;
    private final String message;
}
