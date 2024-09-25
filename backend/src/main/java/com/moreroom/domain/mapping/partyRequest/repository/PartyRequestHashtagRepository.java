package com.moreroom.domain.mapping.partyRequest.repository;

import com.moreroom.domain.mapping.partyRequest.entity.PartyRequestHashtagId;
import com.moreroom.domain.mapping.partyRequest.entity.PartyRequestHashtagMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRequestHashtagRepository extends JpaRepository<PartyRequestHashtagMapping, PartyRequestHashtagId> {

  @Modifying
  @Query("delete from PartyRequestHashtagMapping m where m.id.partyRequestId = :partyRequestId")
  int deleteAllByPartyRequestId(@Param("partyRequestId") Long partyRequestId);


}
