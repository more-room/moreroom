package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.mapping.member.entity.MemberPartyId;
import com.moreroom.domain.mapping.member.entity.MemberPartyMapping;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.entity.Party;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberPartyMappingRepository extends JpaRepository<MemberPartyMapping, MemberPartyId> {

  @Query("select count(*) from MemberPartyMapping m where m.party.partyId = :partyId")
  int getNumberOfMemberByPartyId(Long partyId);

  Optional<MemberPartyMapping> findByMemberAndParty(Member member, Party party);

  @Query("select m.party.partyId from MemberPartyMapping m where m.member.memberId = :memberId")
  List<Long> getPartyIdListByMemberId(Long memberId);

  @Modifying
  @Query("delete from MemberPartyMapping m where m.member.memberId = :memberId and m.party.partyId = :partyId")
  int deleteMemberPartyMappingByMemberAndParty(Long memberId, Long partyId);


  @Query("select m.email from Member m join MemberPartyMapping mp on m = mp.member where mp.party.partyId = :partyId and m.email != :email")
  List<String> getEmailListForChattingAlarm(Long partyId, String email);

}
