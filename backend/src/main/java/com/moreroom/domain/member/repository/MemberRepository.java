package com.moreroom.domain.member.repository;

import com.moreroom.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    List<Member> findAllByEmailIn(List<String> emails);
    List<Member> findAllByMemberIdIn(List<Long> memberIdList);
}
