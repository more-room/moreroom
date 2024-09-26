package com.moreroom.domain.hashtag.dto.response;

import com.moreroom.domain.hashtag.entity.Hashtag;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HashtagResponseDTO {
    private Integer hashtagId;
    private String hashtagName;

    public static HashtagResponseDTO toDTO(Hashtag hashtag) {
        return HashtagResponseDTO.builder()
            .hashtagId(hashtag.getHashtagId())
            .hashtagName(hashtag.getHashtagName())
            .build();
    }
}
