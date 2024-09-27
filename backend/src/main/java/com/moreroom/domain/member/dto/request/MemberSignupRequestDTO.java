package com.moreroom.domain.member.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignupRequestDTO {

    @NotNull(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식에 맞춰주세요.")
    private String email;
    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
        message = "비밀번호는 소문자와 숫자를 각각 최소 하나 이상 포함하고, 8자리 이상이어야 합니다."
    )
    private String password;
    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
        message = "비밀번호는 소문자와 숫자를 각각 최소 하나 이상 포함하고, 8자리 이상이어야 합니다."
    )
    private String passwordCheck;
    @NotNull(message = "닉네임을 입력해주세요")
    @Pattern(
        regexp = "^[가-힣a-zA-Z0-9]{2,7}$",
        message = "닉네임은 2~7자 사이의 한글, 영문(대소문자 구분 없음), 숫자만 허용됩니다."
    )
    private String nickname;
    private String gender;
    private String regionId;
    @DateTimeFormat(pattern = "YYYY-MM-DD")
    private LocalDate birth;
    private List<Integer> genreIdList;
}
