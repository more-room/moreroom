package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.mapping.member.entity.MemberPartyId;
import com.moreroom.domain.mapping.member.entity.MemberPartyMapping;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.entity.Party;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberPartyMappingRepository extends JpaRepository<MemberPartyMapping, MemberPartyId> {

  @Query("select count(*) from MemberPartyMapping m where m.party.partyId = :partyId")
  int getNumberOfMemberByPartyId(Long partyId);

  Optional<MemberPartyMapping> findByMemberAndParty(Member member, Party party);
}
