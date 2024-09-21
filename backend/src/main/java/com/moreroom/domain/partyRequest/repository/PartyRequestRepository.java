package com.moreroom.domain.partyRequest.repository;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PartyRequestRepository extends JpaRepository<PartyRequest, Long> {
  @Query("select pr from PartyRequest pr where pr.theme.themeId = :themeId and pr.member.memberId in :memberIdList")
  List<PartyRequest> findByThemeIdandMemberIdList(@Param("themeId") Long themeId, @Param("memberIdList") List<Long> memberIdList);
}
