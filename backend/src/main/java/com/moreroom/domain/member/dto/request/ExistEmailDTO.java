package com.moreroom.domain.member.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExistEmailDTO {
    @NotNull(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식에 맞춰주세요")
    private String email;
}
