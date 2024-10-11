package com.moreroom.domain.brand.exception;

import static com.moreroom.domain.genre.exception.GenreExceptionConstants.GENRE_NOT_FOUND;

import com.moreroom.global.exception.CustomException;

public class BrandNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public BrandNotFoundException() {
        super(GENRE_NOT_FOUND);
    }
}
