package com.moreroom.domain.member.dto.response;

import com.moreroom.domain.hashtag.dto.response.HashtagResponseDTO;
import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.mapping.member.entity.MemberHashtagMapping;
import com.moreroom.domain.member.entity.Member;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberProfileResponseDTO {
    // todo 장르, 해시태그 매핑
    private String nickname;
    private String photo;
    private List<HashtagResponseDTO> hashtagList;

    public static MemberProfileResponseDTO toDTO(Member member, List<HashtagResponseDTO> hashtagList) {
        return MemberProfileResponseDTO.builder()
            .nickname(member.getNickname())
            .photo(member.getPhoto())
            .hashtagList(hashtagList)
            .build();
    }
}
