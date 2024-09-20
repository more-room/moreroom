package com.moreroom.global.util;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FindMemberService {

    private final MemberRepository memberRepository;

    public Long findCurrentMember() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (memberRepository.findByEmail(email).isPresent()) {
            Member member = memberRepository.findByEmail(email).get();

            return member.getMemberId();
        }
        throw new MemberNotFoundException();
    }
}
