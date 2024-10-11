package com.moreroom.domain.hashtagGroup.exception;

import static com.moreroom.domain.hashtagGroup.exception.HashtagGroupExceptionConstants.HASHTAG_GROUP_NOT_FOUND;

import com.moreroom.global.exception.CustomException;

public class HashtagGroupNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public HashtagGroupNotFoundException() {
        super(HASHTAG_GROUP_NOT_FOUND);
    }
}
