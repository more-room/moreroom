package com.moreroom.domain.hashtagGroup.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HashtagGroupExceptionConstants implements ExceptionConstants {
    HASHTAG_GROUP_NOT_FOUND("HG001", "해시태그 그룹을 찾을 수 없습니다.");

    private final String code;
    private final String message;

}
