package com.moreroom.domain.member.dto.response;

import com.moreroom.domain.genre.dto.response.GenreResponseDTO;
import com.moreroom.domain.hashtag.dto.response.HashtagResponseDTO;
import com.moreroom.domain.member.entity.Member;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberProfileResponseDTO {
    private String nickname;
    private String photo;
    private List<String> genreList;
    private List<HashtagResponseDTO> hashtagList;

    public static MemberProfileResponseDTO toDTO(Member member, List<GenreResponseDTO> genreList, List<HashtagResponseDTO> hashtagList) {
        return MemberProfileResponseDTO.builder()
            .nickname(member.getNickname())
            .photo(member.getPhoto())
            .genreList(genreList.stream()
                .map(GenreResponseDTO::getGenreName)
                .collect(Collectors.toList()))
            .hashtagList(hashtagList)
            .build();
    }
}
