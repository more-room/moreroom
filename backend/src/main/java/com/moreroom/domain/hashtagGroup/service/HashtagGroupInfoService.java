package com.moreroom.domain.hashtagGroup.service;

import com.moreroom.domain.hashtagGroup.dto.response.HashtagGroupResponseDto;
import com.moreroom.domain.hashtagGroup.repository.HashtagGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class HashtagGroupInfoService {

    private final HashtagGroupRepository hashtagGroupRepository;

    public HashtagGroupResponseDto getHashtagGroupList() {
        return HashtagGroupResponseDto.toDto(hashtagGroupRepository.findAll());
    }

}
