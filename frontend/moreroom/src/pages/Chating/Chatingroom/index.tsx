/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { TopBar } from "../../../components/TopBar";
import { 
  notice, 
  noticedetail, 
  noticeIconText, 
  texttype, 
  inputBar, 
  input, 
  sendBtn,
  iconColor,
  topbarcolor
} from "./styles"; // 필요한 스타일 임포트
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { Icon } from "../../../components/Icon";
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'; // 전송 버튼으로 사용할 아이콘

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';  // STOMP 클라이언트 가져오기
import { Frame } from '@stomp/stompjs';  // 타입 가져오기

export const ChatingRoom = () => {
  const [showNotice, setShowNotice] = useState(false);
  const [chat, setChat] = useState("");

  // 공지사항 토글
  const toggleNotice = () => {
    setShowNotice(!showNotice);
  };

  // 채팅 전송
  const sendChat = () => {
    if (chat.trim()) {
      console.log("보낸채팅 확인: ", chat);
      setChat(""); // 메시지 전송 후 입력창 비우기
    }
  };

  

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" defaultValue="파티 목록" title="채팅방 이름"/>
      </TopBar>

      {/* 공지사항 영역 */}
      <div css={notice} onClick={toggleNotice}>
        <div css={noticeIconText}>
          <span role="img" aria-label="notice">
            <Icon size={1.5} color="secondary">
              <MegaphoneIcon />
            </Icon>
          </span>
          <span css={texttype}>공지 사항 제목</span>
        </div>
        <div css={iconColor}>{showNotice ? "▲" : "▼"}</div>
      </div>

      {/* 공지사항 내용 */}
      {showNotice && (
        <div css={noticedetail}>
          <p>공지사항: 28일 4시 반 대구요</p>
        </div>
      )}

      {/* 입력 폼 */}
      <div css={inputBar}>
        <input
          type="text"
          value={chat}
          placeholder="채팅 내용"
          css={input}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              sendChat();
            }
          }}
        />
        <ArrowUpCircleIcon css={sendBtn} onClick={sendChat} />
      </div>

      
    </div>
  );
};
