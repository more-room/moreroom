package com.moreroom.domain.party.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.party.dto.ChatMessageDto;
import com.moreroom.domain.party.dto.MessageConvertDto;
import com.moreroom.domain.party.dto.PartyMessageLogsDto;
import com.moreroom.domain.party.entity.PartyMessage;
import com.moreroom.domain.party.repository.PartyMessageRepository;
import com.moreroom.global.dto.RedisUserInfo;
import com.moreroom.global.util.RedisUtil;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MessageService {

  private final PartyMessageRepository partyMessageRepository;
  private final RedisUtil redisUtil;
  private final MemberRepository memberRepository;

  public void saveMessage(ChatMessageDto message, Principal principal) {
    PartyMessage partyMessage = PartyMessage.builder()
        .email(principal.getName())
        .message(message.getMessage())
        .time(LocalDateTime.now())
        .partyId(message.getPartyId())
        .build();

    partyMessageRepository.save(partyMessage);
  }

  //채팅 내역 불러오기
  public PartyMessageLogsDto getMessageLogs(Long partyId, String lastMessageId, int pageSize)
      throws JsonProcessingException {
    // 채팅 정보 조회
    Pageable pageable = PageRequest.of(0, pageSize);
    List<PartyMessage> messages;
    if (lastMessageId == null) {
      messages = partyMessageRepository.findByPartyIdOrderByIdDesc(partyId, pageable);
    } else {
      messages = partyMessageRepository.findByPartyIdAndIdLessThanOrderByIdDesc(partyId, lastMessageId, pageable);
    }

    // 메세지 내용을 프론트가 필요한 정보들로 가공 (닉네임, 프사, 메세지)
    List<MessageConvertDto> convertedMessages = convertMessageList(messages);

    // lastMessageId 찾기
    lastMessageId = messages.get(messages.size()-1).getId();

    return new PartyMessageLogsDto(convertedMessages, lastMessageId);
  }

  // 메세지 가공
  private List<MessageConvertDto> convertMessageList(List<PartyMessage> messages)
      throws JsonProcessingException {
    // 1. 채팅 주고받은 사람들의 이메일 골라내기
    Set<String> emailSet = messages.stream()
        .map(PartyMessage::getEmail)
        .collect(Collectors.toSet());
    List<String> emails = new ArrayList<>(emailSet);

    // 2. redis에서 사용자 정보 조회
    List<String> keys = emails.stream().map(s -> "USERINFO:" + s).toList(); //email -> key
    List<RedisUserInfo> allUserInfo = redisUtil.getAllUserInfo(keys); //레디스에서 정보 조회

    // 3. email : userInfo 맵 만들기
    Map<String, RedisUserInfo> infoMap = new HashMap<>(); //email : info 맵
    List<String> notFoundInfoEmails = new ArrayList<>(); //레디스에서 정보 못찾은 이메일
    for (int i = 0; i < emails.size(); i++) {
      RedisUserInfo info = allUserInfo.get(i); //i번째 info
      String email = emails.get(i); //i번째 email
      if (info != null) {
        infoMap.put(email, info);
      } else {
        notFoundInfoEmails.add(email);
      }
    }

    // 4. 레디스에 없는 정보는 mysql에서 조회, 레디스에 저장하기
    List<Member> memberInfoList = memberRepository.findAllByEmailIn(notFoundInfoEmails); //mysql 조회
    for (Member m : memberInfoList) {
      RedisUserInfo info = new RedisUserInfo(m.getMemberId(), m.getEmail(),
          m.getNickname(), m.getPhoto());
      infoMap.put(m.getEmail(), info); //map에 저장
      redisUtil.saveRedisUserInfo("USERINFO:" + m.getEmail(), info, 7200); //redis에 저장
    }

    // 5. 메세지 가공
    return messages.stream()
        .map(m -> {
          RedisUserInfo userInfo = infoMap.get(m.getEmail());
          return MessageConvertDto.builder()
              .nickname(userInfo.getNickname())
              .photo(userInfo.getPhoto())
              .message(m.getMessage())
              .build();
        }).toList();
  }



}
