package com.moreroom.domain.deviceToken.exception;

import com.moreroom.global.exception.CustomException;

import static com.moreroom.domain.deviceToken.exception.DeviceTokneExceptionConstants.PUSH_NOTIFICATION_ERROR;


public class PushNotificationException extends CustomException {

    private static final long serialVersionUID = 1L;

    public PushNotificationException() {
        super(PUSH_NOTIFICATION_ERROR);
    }

}
