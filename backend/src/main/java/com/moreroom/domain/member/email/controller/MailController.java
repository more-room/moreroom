package com.moreroom.domain.member.email.controller;

import com.moreroom.domain.member.email.dto.request.EmailCheckRequestDTO;
import com.moreroom.domain.member.email.service.MailService;
import com.moreroom.domain.member.email.dto.request.EmailRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/member")
public class MailController {

    private final MailService mailService;

    @PostMapping ("/send-email")
    public String mailSend(@RequestBody EmailRequestDTO emailDto){
        System.out.println("이메일 인증 이메일 :"+emailDto.getEmail());
        return mailService.joinEmail(emailDto.getEmail());
    }
    @PostMapping("/check-email")
    public String AuthCheck(@RequestBody EmailCheckRequestDTO emailCheckDto){
        boolean Checked=mailService.CheckAuthNum(emailCheckDto.getEmail(),emailCheckDto.getAuthToken());
        if(Checked){
            return "ok";
        }
        else{
            throw new NullPointerException("뭔가 잘못!");
        }
    }




}
