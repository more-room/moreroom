package com.moreroom.global.exception.globalException;

import com.moreroom.global.exception.CustomException;

public class DateTimeInvalidException extends CustomException {

    private static final long serialVersionUID = 1L;

    public DateTimeInvalidException() {
        super(GlobalExceptionConstants.DATETIME_INVALID);
    }

}
