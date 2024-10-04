package com.moreroom.domain.party.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class PartyMemberDto {
    private List<MemberDto> memberList;

    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Getter
    public static class MemberDto {
        private String photo;
        private String nickname;
    }
}
