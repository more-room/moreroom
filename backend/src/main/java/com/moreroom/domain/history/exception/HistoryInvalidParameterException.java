package com.moreroom.domain.history.exception;


import com.moreroom.global.exception.CustomException;

public class HistoryInvalidParameterException extends CustomException {

    private static final long serialVersionUID = 1L;

    public HistoryInvalidParameterException() {
        super(HistoryExceptionConstants.HISTORY_INVALID_PARAMETER);
    }
}
