package com.moreroom.domain.member.dto.request;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignupRequestDTO {
    private String email;
    private String password;
    private String passwordCheck;
    private String nickname;
    private Boolean gender;
    private String regionId;
    private Date birth;
}
