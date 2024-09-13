package com.moreroom.domain.member.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum MemberExceptionConstants implements ExceptionConstants {

    MEMBER_NOT_FOUND("M001", "사용자를 찾을 수 없습니다."),
    MEMBER_EXISTS_EMAIL("M002", "이미 존재하는 이메일입니다."),
    MEMBER_EXISTS_NICKNAME("M003", "이미 존재하는 닉네임입니다."),
    MEMBER_PASSWORD_NOT_MATCHED("M004", "비밀번호가 일치하지 않습니다.");


    private final String code;
    private final String message;
}
