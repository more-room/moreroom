package com.moreroom.domain.hashtag.exception;

import static com.moreroom.domain.hashtag.exception.HashtagExceptionConstants.HASHTAG_NOT_FOUND;

import com.moreroom.global.exception.CustomException;

public class HashtagNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public HashtagNotFoundException() {
        super(HASHTAG_NOT_FOUND);
    }
}
