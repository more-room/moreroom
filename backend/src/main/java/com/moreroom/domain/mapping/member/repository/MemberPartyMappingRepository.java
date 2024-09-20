package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.mapping.member.entity.MemberPartyId;
import com.moreroom.domain.mapping.member.entity.MemberPartyMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberPartyMappingRepository extends JpaRepository<MemberPartyMapping, MemberPartyId> {

}
