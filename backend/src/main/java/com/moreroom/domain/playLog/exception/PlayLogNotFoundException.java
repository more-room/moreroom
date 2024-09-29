package com.moreroom.domain.playLog.exception;


import com.moreroom.global.exception.CustomException;

public class PlayLogNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public PlayLogNotFoundException() {
        super(PlayLogExceptionConstants.PLAYLOG_NOT_FOUND);
    }
}
