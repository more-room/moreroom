package com.moreroom.domain.member.exception;

import com.moreroom.global.exception.CustomException;

public class MemberNotFoundException extends CustomException {

    private static final long serialVersionUID = 1L;

    public MemberNotFoundException() {
        super(MemberExceptionConstants.MEMBER_NOT_FOUND);
    }
}
