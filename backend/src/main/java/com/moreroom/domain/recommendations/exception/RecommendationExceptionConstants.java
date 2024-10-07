package com.moreroom.domain.recommendations.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RecommendationExceptionConstants implements ExceptionConstants {
    RECOMMENDATION_NOT_FOUND("RC001", "추천 데이터를 찾을 수 없습니다.");

    private final String code;
    private final String message;
}
