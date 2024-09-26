package com.moreroom.domain.hashtag.service;

import com.moreroom.domain.hashtag.dto.response.HashtagInfoResponseDto;
import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.hashtag.repository.HashtagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class HashtagInfoService {

    private final HashtagRepository hashtagRepository;

    public HashtagInfoResponseDto getHashtagList(Integer groupId) {
        List<Hashtag> hashtagList = hashtagRepository.findAllByHashtagGroupHashtagGroupId(groupId);

        return HashtagInfoResponseDto.toDto(hashtagList);
    }
}
