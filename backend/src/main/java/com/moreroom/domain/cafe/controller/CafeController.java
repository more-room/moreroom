package com.moreroom.domain.cafe.controller;

import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.cafe.service.CafeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cafe")
public class CafeController {

    private final CafeService cafeService;

    @GetMapping("/{cafeId}")
    public ResponseEntity<Cafe> cafeDetail() {

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
