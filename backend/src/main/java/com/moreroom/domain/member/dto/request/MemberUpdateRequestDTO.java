package com.moreroom.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequestDTO {
    // todo 장르 매핑
    @NotNull(message = "닉네임을 입력해주세요")
    @Pattern(
        regexp = "^[가-힣a-zA-Z0-9]{2,7}$",
        message = "닉네임은 2~7자 사이의 한글, 영문(대소문자 구분 없음), 숫자만 허용됩니다."
    )
    private String nickname;
    private String gender;
    @DateTimeFormat(pattern = "YYYY-MM-DD")
    private LocalDate birth;
    private String regionId;
    private List<Integer> genreIdList;
    private Integer clearRoom;
}
