package com.moreroom.domain.hashtagGroup.dto.response;

import com.moreroom.domain.hashtagGroup.entity.HashtagGroup;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class HashtagGroupComponentDto {

    private Integer groupId;
    private String groupName;

    public static HashtagGroupComponentDto toDto(HashtagGroup hashtagGroup) {
        return HashtagGroupComponentDto.builder()
            .groupId(hashtagGroup.getHashtagGroupId())
            .groupName(hashtagGroup.getHashtagGroupName())
            .build();
    }

}
