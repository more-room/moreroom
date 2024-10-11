package com.moreroom.domain.member.mail.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailCheckRequestDTO {
    @NotNull(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식에 맞춰주세요.")
    private String email;
    private String authToken;

}
