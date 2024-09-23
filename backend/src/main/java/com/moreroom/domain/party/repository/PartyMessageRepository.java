package com.moreroom.domain.party.repository;

import com.moreroom.domain.party.entity.PartyMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PartyMessageRepository extends MongoRepository<PartyMessage, String> {

}
