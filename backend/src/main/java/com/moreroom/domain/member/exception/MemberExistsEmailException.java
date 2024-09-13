package com.moreroom.domain.member.exception;

import com.moreroom.global.exception.CustomException;

public class MemberExistsEmailException extends CustomException {

    private static final long serialVersionUID = 1L;

    public MemberExistsEmailException() {
        super(MemberExceptionConstants.MEMBER_EXISTS_EMAIL);
    }
}
