package com.moreroom.domain.playLog.exception;


import com.moreroom.global.exception.CustomException;

public class PlayLogInvalidDataException extends CustomException {

    private static final long serialVersionUID = 1L;

    public PlayLogInvalidDataException() {
        super(PlayLogExceptionConstants.PLAYLOG_INVALID_VALUE);
    }
}
