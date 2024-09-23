package com.moreroom.domain.theme.exception;

import com.moreroom.global.exception.CustomException;

public class ThemeNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public ThemeNotFoundException() {
        super(ThemeExceptionConstants.THEME_NOT_FOUND);
    }

}
