package com.moreroom.domain.member.mail.exception;

import com.moreroom.global.exception.CustomException;

public class MailAuthNotMatchedException extends CustomException {

    private static final long serialVersionUID = 1L;

    public MailAuthNotMatchedException() {super(MailExceptionConstants.MAIL_AUTH_NOT_MATCHED);}
}
