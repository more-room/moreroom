package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.mapping.member.entity.MemberGenreId;
import com.moreroom.domain.mapping.member.entity.MemberGenreMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberGenreMappingRepository extends JpaRepository<MemberGenreMapping, MemberGenreId> {

}
