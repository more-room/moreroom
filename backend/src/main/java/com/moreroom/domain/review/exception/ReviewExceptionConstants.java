package com.moreroom.domain.review.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReviewExceptionConstants implements ExceptionConstants {

    REVIEW_NOT_FOUND("R001", "리뷰를 찾을 수 없습니다.");

    private final String code;
    private final String message;
}
