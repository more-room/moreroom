package com.moreroom.domain.member.dto.response;

import com.moreroom.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberReviewResponseDTO {

    private Long memberId;
    private String memberName;
    private String memberProfile;

    public static MemberReviewResponseDTO toDTO(Member member) {
        return MemberReviewResponseDTO.builder()
            .memberId(member.getMemberId())
            .memberName(member.getNickname())
            .memberProfile(member.getPhoto())
            .build();
    }
}
