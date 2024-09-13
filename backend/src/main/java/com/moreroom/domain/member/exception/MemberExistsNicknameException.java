package com.moreroom.domain.member.exception;

import com.moreroom.global.exception.CustomException;

public class MemberExistsNicknameException extends CustomException {

    private static final long serialVersionUID = 1L;

    public MemberExistsNicknameException() {
        super(MemberExceptionConstants.MEMBER_EXISTS_NICKNAME);
    }
}
