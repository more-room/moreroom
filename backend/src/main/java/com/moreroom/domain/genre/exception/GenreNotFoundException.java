package com.moreroom.domain.genre.exception;

import static com.moreroom.domain.genre.exception.GenreExceptionConstants.GENRE_NOT_FOUND;

import com.moreroom.global.exception.CustomException;


public class GenreNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public GenreNotFoundException() {
        super(GENRE_NOT_FOUND);
    }

}
