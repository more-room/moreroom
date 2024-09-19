package com.moreroom.domain.mapping.partyRequest.repository;

import com.moreroom.domain.mapping.partyRequest.entity.PartyRequestHashtagId;
import com.moreroom.domain.mapping.partyRequest.entity.PartyRequestHashtagMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRequestHashtagRepository extends JpaRepository<PartyRequestHashtagMapping, PartyRequestHashtagId> {

}
