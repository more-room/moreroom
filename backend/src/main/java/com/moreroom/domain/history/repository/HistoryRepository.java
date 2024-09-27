package com.moreroom.domain.history.repository;

import com.moreroom.domain.history.entity.History;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History> findAllByMemberMemberIdAndThemeThemeId(Long memberId, Integer themeId);

    Optional<History> findTop1ByMemberMemberIdOrderByPlayDateDesc(Long memberId);

    Optional<History> findByHistoryIdAndMemberMemberId(Long historyId, Long memberId);
}
