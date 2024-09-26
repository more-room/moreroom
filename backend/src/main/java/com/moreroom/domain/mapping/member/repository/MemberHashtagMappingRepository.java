package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.mapping.member.entity.MemberHashtagId;
import com.moreroom.domain.mapping.member.entity.MemberHashtagMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberHashtagMappingRepository extends JpaRepository<MemberHashtagMapping, MemberHashtagId> {

    List<MemberHashtagMapping> findByMember(Member member);
    MemberHashtagMapping findByMemberAndHashtag(Member member, Hashtag hashtag);
    boolean existsMemberHashtagMappingByMemberAndHashtag(Member member, Hashtag hashtag);
}
