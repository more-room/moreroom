package com.moreroom.domain.member.mail.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MailExceptionConstants implements ExceptionConstants {

    MAIL_AUTH_NOT_MATCHED("A001", "인증번호가 일치하지 않습니다.");

    private final String code;
    private final String message;
}
