package com.moreroom.global.exception.globalException;

import com.moreroom.global.exception.CustomException;

public class JsonSerializationException extends CustomException {

    private static final long serialVersionUID = 1L;

    public JsonSerializationException() {
        super(GlobalExceptionConstants.JSON_SERIALIZATION_ERROR);
    }

}
