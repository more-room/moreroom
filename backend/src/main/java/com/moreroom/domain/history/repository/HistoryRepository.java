package com.moreroom.domain.history.repository;

import com.moreroom.domain.history.entity.History;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History> findAllByMemberMemberIdAndThemeThemeId(Long memberId, Integer themeId);

}
