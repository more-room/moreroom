package com.moreroom.domain.cafe.exception;

import static com.moreroom.domain.cafe.exception.CafeExceptionConstants.CAFE_NOT_FOUND;

import com.moreroom.global.exception.CustomException;


public class CafeNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public CafeNotFoundException() {
        super(CAFE_NOT_FOUND);
    }

}
