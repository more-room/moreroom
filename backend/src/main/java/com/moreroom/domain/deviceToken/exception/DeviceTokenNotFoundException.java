package com.moreroom.domain.deviceToken.exception;

import static com.moreroom.domain.deviceToken.exception.DeviceTokneExceptionConstants.DEVICE_TOKEN_NOT_FOUND;

import com.moreroom.global.exception.CustomException;


public class DeviceTokenNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public DeviceTokenNotFoundException() {
        super(DEVICE_TOKEN_NOT_FOUND);
    }

}
