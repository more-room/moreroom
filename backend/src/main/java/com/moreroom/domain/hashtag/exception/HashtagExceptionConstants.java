package com.moreroom.domain.hashtag.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HashtagExceptionConstants implements ExceptionConstants {
    HASHTAG_NOT_FOUND("H001", "해시태그를 찾을 수 없습니다.");

    private final String code;
    private final String message;

}
