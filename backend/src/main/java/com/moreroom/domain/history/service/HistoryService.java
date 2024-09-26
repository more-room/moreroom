package com.moreroom.domain.history.service;

import com.moreroom.domain.history.dto.HistoryListResponseDto;
import com.moreroom.domain.history.repository.HistoryQueryRepository;
import com.moreroom.domain.history.repository.HistoryRepository;
import com.moreroom.global.util.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final HistoryQueryRepository historyQueryRepository;

    public HistoryListResponseDto findHistoriesByDate(Long memberId, String startDate,
        String endDate) {
        return historyQueryRepository.findHistoriesByDate(memberId,
            StringUtil.stringToDate(startDate), StringUtil.stringToDate(endDate));
    }

}
