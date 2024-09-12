package com.moreroom.domain.member.dto.request;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequestDTO {
    // todo 장르 매핑
    private String nickname;
    private Boolean gender;
    private Date birth;
    private String regionId;
    private Integer clearRoom;
}
