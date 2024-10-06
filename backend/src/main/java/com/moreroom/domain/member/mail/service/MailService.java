package com.moreroom.domain.member.mail.service;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.global.util.RedisUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private final RedisUtil redisUtil;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private int authNumber;
    private String tempPassword;

    public boolean CheckAuthNum(String email,String authNum){
        if(redisUtil.getData(authNum)==null){
            return false;
        }
        else
            return redisUtil.getData(authNum).equals(email);
    }

    //임의의 6자리 양수를 반환합니다.
    public void makeRandomNumber() {
        Random r = new Random();
        String randomNumber = "";
        for(int i = 0; i < 6; i++) {
            randomNumber += Integer.toString(r.nextInt(10));
        }

        authNumber = Integer.parseInt(randomNumber);
    }

    // 임시 비밀번호 생성
    public void getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        tempPassword = str;
    }


    //mail을 어디서 보내는지, 어디로 보내는지 , 인증 번호를 html 형식으로 어떻게 보내는지 작성합니다.
    public void joinEmail(String email) {
        makeRandomNumber();
        String setFrom = "ssafy11d206@gmail.com"; // email-config에 설정한 자신의 이메일 주소를 입력
        String title = "MOREROOM 인증 이메일 입니다."; // 이메일 제목
        String content =
            "MOREROOM을 방문해주셔서 감사합니다." + 	//html 형식으로 작성 !
                "<br><br>" +
                "인증번호는 " + authNumber + "입니다." +
                "<br>" +
                "인증번호를 제대로 입력해주세요."; //이메일 내용 삽입
        mailSend(setFrom, email, title, content);
    }

    //mail을 어디서 보내는지, 어디로 보내는지 , 인증 번호를 html 형식으로 어떻게 보내는지 작성합니다.
    public void joinEmailWithPassword(String email) {
        getTempPassword();
        String setFrom = "ssafy11d206@gmail.com"; // email-config에 설정한 자신의 이메일 주소를 입력
        String title = "MOREROOM 인증 이메일 입니다."; // 이메일 제목
        String content =
            "MOREROOM을 방문해주셔서 감사합니다." + 	//html 형식으로 작성 !
                "<br><br>" +
                "임시 비밀번호는 " + tempPassword + "입니다." +
                "<br>" +
                "비밀번호를 꼭 변경해주세요"; //이메일 내용 삽입
        Optional<Member> optionalMember = memberRepository.findByEmailAndDelFlagFalse(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.changePassword(passwordEncoder.encode(tempPassword));

            mailSendWithPassword(setFrom, email, title, content);
        }
        else {
            throw new MemberNotFoundException();
        }
    }

    //이메일을 전송합니다.
    public void mailSend(String setFrom, String toMail, String title, String content) {
        MimeMessage message = mailSender.createMimeMessage();//JavaMailSender 객체를 사용하여 MimeMessage 객체를 생성
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true,"utf-8");//이메일 메시지와 관련된 설정을 수행합니다.
            // true를 전달하여 multipart 형식의 메시지를 지원하고, "utf-8"을 전달하여 문자 인코딩을 설정
            helper.setFrom(setFrom);//이메일의 발신자 주소 설정
            helper.setTo(toMail);//이메일의 수신자 주소 설정
            helper.setSubject(title);//이메일의 제목을 설정
            helper.setText(content,true);//이메일의 내용 설정 두 번째 매개 변수에 true를 설정하여 html 설정으로한다.
            mailSender.send(message);
        } catch (MessagingException e) {//이메일 서버에 연결할 수 없거나, 잘못된 이메일 주소를 사용하거나, 인증 오류가 발생하는 등 오류
            // 이러한 경우 MessagingException이 발생
            e.printStackTrace();//e.printStackTrace()는 예외를 기본 오류 스트림에 출력하는 메서드
        }

        redisUtil.setDataExpire(Integer.toString(authNumber),toMail,60*5L);
    }

    public void mailSendWithPassword(String setFrom, String toMail, String title, String content) {
        MimeMessage message = mailSender.createMimeMessage();//JavaMailSender 객체를 사용하여 MimeMessage 객체를 생성
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true,"utf-8");//이메일 메시지와 관련된 설정을 수행합니다.
            // true를 전달하여 multipart 형식의 메시지를 지원하고, "utf-8"을 전달하여 문자 인코딩을 설정
            helper.setFrom(setFrom);//이메일의 발신자 주소 설정
            helper.setTo(toMail);//이메일의 수신자 주소 설정
            helper.setSubject(title);//이메일의 제목을 설정
            helper.setText(content,true);//이메일의 내용 설정 두 번째 매개 변수에 true를 설정하여 html 설정으로한다.
            mailSender.send(message);
        } catch (MessagingException e) {//이메일 서버에 연결할 수 없거나, 잘못된 이메일 주소를 사용하거나, 인증 오류가 발생하는 등 오류
            // 이러한 경우 MessagingException이 발생
            e.printStackTrace();//e.printStackTrace()는 예외를 기본 오류 스트림에 출력하는 메서드
        }
    }
}
