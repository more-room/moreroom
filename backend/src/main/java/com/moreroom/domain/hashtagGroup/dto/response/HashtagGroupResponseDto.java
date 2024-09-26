package com.moreroom.domain.hashtagGroup.dto.response;

import com.moreroom.domain.hashtagGroup.entity.HashtagGroup;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class HashtagGroupResponseDto {

    List<HashtagGroupComponentDto> groupList;

    public static HashtagGroupResponseDto toDto(List<HashtagGroup> hl) {
        List<HashtagGroupComponentDto> hashtagGroupComponentDtoList = hl.stream()
            .map(HashtagGroupComponentDto::toDto).toList();

        return HashtagGroupResponseDto.builder()
            .groupList(hashtagGroupComponentDtoList)
            .build();
    }
}
