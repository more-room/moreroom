package com.moreroom.domain.member.mail.controller;

import com.moreroom.domain.member.mail.dto.request.EmailCheckRequestDTO;
import com.moreroom.domain.member.mail.exception.MailAuthNotMatchedException;
import com.moreroom.domain.member.mail.service.MailService;
import com.moreroom.domain.member.mail.dto.request.EmailRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/member")
public class MailController {

    private final MailService mailService;

    @PostMapping("/send-email")
    public ResponseEntity<String> mailSend(@RequestBody @Valid EmailRequestDTO emailDto){
        mailService.joinEmail(emailDto.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/check-email")
    public String AuthCheck(@RequestBody @Valid EmailCheckRequestDTO emailCheckDto){
        boolean Checked=mailService.CheckAuthNum(emailCheckDto.getEmail(),emailCheckDto.getAuthToken());
        if(Checked){
            return "ok";
        }
        else{
            throw new MailAuthNotMatchedException();
        }
    }

    @PostMapping("/temporary-password")
    public ResponseEntity<String> temporaryPassword(@RequestBody @Valid EmailRequestDTO emailRequestDTO) {
        mailService.joinEmailWithPassword(emailRequestDTO.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
