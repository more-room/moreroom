package com.moreroom.domain.hashtag.dto.response;

import com.moreroom.domain.hashtag.entity.Hashtag;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class HashtagInfoResponseDto {

    List<HashtagResponseDTO> hashtagList;

    public static HashtagInfoResponseDto toDto(List<Hashtag> hl) {
        List<HashtagResponseDTO> hashtagResponseDTOList = hl.stream().map(HashtagResponseDTO::toDTO)
            .toList();

        return HashtagInfoResponseDto.builder()
            .hashtagList(hashtagResponseDTOList)
            .build();
    }
}
