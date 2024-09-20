package com.moreroom.domain.member.dto.response;

import com.moreroom.domain.member.entity.Member;
import java.util.Date;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class MemberResponseDTO {
    private String email;
    private String nickname;
    private String gender;
    private Date birth;
    private String regionId;
    private Integer clearRoom;

    public static MemberResponseDTO toDTO(Member member) {
        return MemberResponseDTO.builder()
            .email(member.getEmail())
            .nickname(member.getNickname())
            .gender((member.getGender().equals(false)) ? "M" : "F")
            .birth(member.getBirth())
            .regionId(member.getRegion().getRegionId())
            .clearRoom(member.getClearRoom())
            .build();
    }
}
