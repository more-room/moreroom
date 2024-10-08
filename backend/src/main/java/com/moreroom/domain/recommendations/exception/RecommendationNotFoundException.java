package com.moreroom.domain.recommendations.exception;

import com.moreroom.global.exception.CustomException;

public class RecommendationNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public RecommendationNotFoundException() {
        super(RecommendationExceptionConstants.RECOMMENDATION_NOT_FOUND);
    }
}
