package com.moreroom.domain.history.exception;


import com.moreroom.global.exception.CustomException;

public class HistoryNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public HistoryNotFoundException() {
        super(HistoryExceptionConstants.HISTORY_NOT_FOUND);
    }
}
