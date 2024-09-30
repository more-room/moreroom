package com.moreroom.domain.playLog.service;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.playLog.entity.PlayLog;
import com.moreroom.domain.playLog.exception.PlayLogInvalidDataException;
import com.moreroom.domain.playLog.exception.PlayLogNotFoundException;
import com.moreroom.domain.playLog.repository.PlayLogRepository;
import com.moreroom.domain.theme.entity.Theme;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlayLogService {

    private final PlayLogRepository playLogRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void saveOrIncreasePlayLog(Member member, Theme theme) {
        PlayLog playLog = playLogRepository.findByMemberIdAndThemeId(member.getMemberId(),
                theme.getThemeId())
            .orElse(null);

        System.out.println("playLog = " + playLog);
        if (playLog == null) {
            PlayLog newPlayLog = PlayLog.builder()
                .themeId(theme.getThemeId())
                .memberId(member.getMemberId())
                .playCount(1)
                .build();
            playLogRepository.save(newPlayLog);
        } else if (playLog.getPlayCount() >= 1) {
            playLog.increasePlayCount();
        } else {
            throw new PlayLogInvalidDataException();
        }
    }

    @Transactional
    public void deleteOrDecreasePlayLog(Long memberId, Integer themeId) {
        PlayLog playLog = playLogRepository.findByMemberIdAndThemeId(memberId, themeId)
            .orElseThrow(PlayLogNotFoundException::new);
        if (playLog.getPlayCount() == 1) {
            playLogRepository.delete(playLog);
        } else if (playLog.getPlayCount() > 1) {
            playLog.decreasePlayCount();
        } else {
            throw new PlayLogInvalidDataException();
        }
    }

}
