package com.moreroom.domain.member.exception;

import com.moreroom.global.exception.CustomException;

public class MemberPasswordNotMatchedException extends CustomException {

    private static final long serialVersionUID = 1L;

    public MemberPasswordNotMatchedException() {
        super(MemberExceptionConstants.MEMBER_PASSWORD_NOT_MATCHED);
    }
}
