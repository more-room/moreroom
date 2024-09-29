package com.moreroom.domain.review.exception;

import com.moreroom.global.exception.CustomException;

public class ReviewNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public ReviewNotFoundException() {
        super(ReviewExceptionConstants.REVIEW_NOT_FOUND);
    }
}
