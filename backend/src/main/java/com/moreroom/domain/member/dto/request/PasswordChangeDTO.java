package com.moreroom.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeDTO {
    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
        message = "비밀번호는 소문자와 숫자를 각각 최소 하나 이상 포함하고, 8자리 이상이어야 합니다."
    )
    private String newPassword;
    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
        message = "비밀번호는 소문자와 숫자를 각각 최소 하나 이상 포함하고, 8자리 이상이어야 합니다."
    )
    private String newPasswordCheck;
}
