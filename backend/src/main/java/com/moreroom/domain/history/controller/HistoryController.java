package com.moreroom.domain.history.controller;

import com.moreroom.domain.history.dto.response.HistoryListResponseDto;
import com.moreroom.domain.history.dto.response.HistoryListResponseDto.HistoryListComponentDto;
import com.moreroom.domain.history.exception.HistoryNotFoundException;
import com.moreroom.domain.history.service.HistoryService;
import com.moreroom.global.util.FindMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/history")
public class HistoryController {

    private final FindMemberService findMemberService;
    private final HistoryService historyService;

    @GetMapping
    public ResponseEntity<HistoryListResponseDto> findByDate(
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate) {
        long memberId = findMemberService.findCurrentMember();
        HistoryListResponseDto historyListResponseDto = historyService.findHistoriesByDate(memberId,
            startDate, endDate);
        if (historyListResponseDto == null) {
            throw new HistoryNotFoundException();
        }
        return new ResponseEntity<>(historyListResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{historyId}")
    public ResponseEntity<HistoryListComponentDto> findById(@PathVariable Long historyId) {
        long memberId = findMemberService.findCurrentMember();
        HistoryListComponentDto historyListComponentDto = historyService.findHistoryDetail(memberId,
            historyId);
        if (historyListComponentDto == null) {
            throw new HistoryNotFoundException();
        }
        return new ResponseEntity<>(historyListComponentDto, HttpStatus.OK);
    }

}
