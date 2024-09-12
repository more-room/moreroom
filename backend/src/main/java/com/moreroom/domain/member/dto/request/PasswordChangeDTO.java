package com.moreroom.domain.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeDTO {
    private String newPassword;
    private String newPasswordCheck;
}
