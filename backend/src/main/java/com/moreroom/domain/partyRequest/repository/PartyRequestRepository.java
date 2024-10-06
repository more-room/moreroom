package com.moreroom.domain.partyRequest.repository;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRequestRepository extends JpaRepository<PartyRequest, Long> {
  @Query("select pr from PartyRequest pr where pr.theme.themeId = :themeId and pr.member.memberId in :memberIdList")
  List<PartyRequest> findByThemeIdandMemberIdList(@Param("themeId") Integer themeId, @Param("memberIdList") List<Long> memberIdList);

  @Query("select pr from PartyRequest pr where pr.theme.themeId = :themeId and pr.member.memberId = :memberId")
  PartyRequest findByThemeIdandMemberId(@Param("themeId") Integer themeId, @Param("memberId") Long memberId);

  List<PartyRequest> findByThemeIdAndMemberIdIn(Integer themeId, List<Long> memberIds);

  @Query("select pr from PartyRequest pr where pr.redisUuid = :uuid")
  List<PartyRequest> findByUuid(@Param("uuid") String uuid);

  @Query("select pr from PartyRequest pr where pr.member.memberId = :memberId")
  List<PartyRequest> findAllByMemberId(@Param("memberId") Long memberId);

  @Modifying
  @Query("update PartyRequest pr set pr.matchingStatus = :status where pr.partyRequestId = :id")
  int updatePartyRequestStatus(@Param("status") MatchingStatus status, @Param("id") Long partyRequestId);

  @Modifying
  @Query("update PartyRequest pr set pr.matchingStatus = :status, pr.redisUuid = :uuid where pr.redisUuid = :oldUuid")
  int updateStatusAndUuidByUuid(@Param("status") MatchingStatus status, @Param("uuid") String uuid, @Param("oldUuid") String oldUuid);

  @Query("select pr.member, dt.token from PartyRequest pr left join DeviceToken dt on pr.member = dt.member where pr.redisUuid = :uuid")
  List<Object[]> findMemberAndDeviceTokenByUuid(@Param("uuid") String uuid);

  @Modifying
  @Query("update PartyRequest pr set pr.matchingStatus = :status, pr.redisUuid = :uuid where pr.member.memberId in :memberIds and pr.theme.themeId = :themeId")
  int updateUuidAndStatusForMembers(@Param("uuid") String uuid, @Param("status") MatchingStatus status, @Param("themeId") Integer themeId, @Param("memberIds") List<Long> memberIdList);
}
