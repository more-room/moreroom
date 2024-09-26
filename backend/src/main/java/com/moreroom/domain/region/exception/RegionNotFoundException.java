package com.moreroom.domain.region.exception;

import static com.moreroom.domain.region.exception.RegionExceptionConstants.REGION_NOT_FOUND;

import com.moreroom.global.exception.CustomException;


public class RegionNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public RegionNotFoundException() {
        super(REGION_NOT_FOUND);
    }

}
