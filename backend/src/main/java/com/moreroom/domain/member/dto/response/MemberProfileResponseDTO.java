package com.moreroom.domain.member.dto.response;

import com.moreroom.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberProfileResponseDTO {
    // todo 장르, 해시태그 매핑
    private String nickname;
    private String photo;

    public static MemberProfileResponseDTO toDTO(Member member) {
        return MemberProfileResponseDTO.builder()
            .nickname(member.getNickname())
            .photo(member.getPhoto())
            .build();
    }
}
