package com.moreroom.domain.mapping.party.repository;

import com.moreroom.domain.mapping.party.entity.PartyHashtagId;
import com.moreroom.domain.mapping.party.entity.PartyHashtagMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyHashtagMappingRepository extends JpaRepository<PartyHashtagMapping, PartyHashtagId> {

}
