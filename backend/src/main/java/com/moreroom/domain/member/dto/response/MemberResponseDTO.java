package com.moreroom.domain.member.dto.response;

import com.moreroom.domain.member.entity.Member;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class MemberResponseDTO {
    private String email;
    private String nickname;
    private String gender;
    private String birth;
    private String regionId;
    private Integer clearRoom;

    public static MemberResponseDTO toDTO(Member member) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return MemberResponseDTO.builder()
            .email(member.getEmail())
            .nickname(member.getNickname())
            .gender((member.getGender().equals(false)) ? "M" : "F")
            .birth(member.getBirth().format(formatter))
            .regionId(member.getRegion().getRegionId())
            .clearRoom(member.getClearRoom())
            .build();
    }
}
