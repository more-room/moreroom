package com.moreroom.domain.playLog.repository;

import com.moreroom.domain.playLog.entity.PlayLog;
import com.moreroom.domain.playLog.entity.PlayLogId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayLogRepository extends JpaRepository<PlayLog, PlayLogId> {

}
