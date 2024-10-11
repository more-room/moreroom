package com.moreroom.domain.party.repository;

import com.moreroom.domain.party.entity.Party;
import java.util.Optional;

import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Party p where p.partyId = :partyId")
    Optional<Party> findByPartyIdWithPessimisticLock(@Param("partyId") Long partyId);

}
