package com.moreroom.global.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class SessionController {

    @GetMapping("")
    public ResponseEntity<String> getSession(HttpServletRequest request) {
        if (request.getSession().getAttribute("SPRING_SECURITY_CONTEXT") == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // 세션 만료 여부 확인
        long currentTime = System.currentTimeMillis();
        long lastAccessedTime = request.getSession().getLastAccessedTime();
        int maxInactiveInterval =
            request.getSession().getMaxInactiveInterval() * 1000; // 초 단위이므로 밀리초로 변환

        if ((currentTime - lastAccessedTime) > maxInactiveInterval) {
            // 세션이 만료된 경우 401 응답
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(request.getSession().getId(), HttpStatus.OK);
    }
}
