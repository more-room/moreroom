package com.moreroom.domain.party.repository;

import com.moreroom.domain.party.entity.PartyMessage;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyMessageRepository extends MongoRepository<PartyMessage, String> {
  List<PartyMessage> findByPartyIdAndIdLessThanOrderByIdDesc(Long partyId, String id, Pageable pageable);
  List<PartyMessage> findByPartyIdOrderByIdDesc(Long partyId, String id);
}
