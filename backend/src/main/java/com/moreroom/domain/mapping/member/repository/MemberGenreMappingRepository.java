package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.mapping.member.entity.MemberGenreId;
import com.moreroom.domain.mapping.member.entity.MemberGenreMapping;
import com.moreroom.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberGenreMappingRepository extends JpaRepository<MemberGenreMapping, MemberGenreId> {

    List<MemberGenreMapping> findByMember(Member member);

    MemberGenreMapping findByMemberAndGenre(Member member, Genre genre);

    boolean existsByMemberAndGenre(Member member, Genre genre);
}
