package com.moreroom.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExistNicknameDTO {

    @NotNull(message = "닉네임을 입력해주세요")
    @Pattern(
        regexp = "^(?!.*(.).*\\1)[가-힣a-zA-Z0-9]{2,7}$",
        message = "닉네임은 2~7자 사이의 한글, 영문(대소문자 구분 없음), 숫자만 허용되며, 중복된 문자는 사용할 수 없습니다."
    )
    private String nickname;
}
