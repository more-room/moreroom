/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { MegaphoneIcon, CogIcon } from '@heroicons/react/24/solid'; // 설정 아이콘 임포트
import { Icon } from "../../../components/Icon";
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'; // 전송 버튼으로 사용할 아이콘
import { IParty } from "../../../types/chatingTypes";
import { useSearchPartiesStore } from "../../../stores/chatingStore";
import { getPartyList } from "../../../apis/chatApi"; // 파티 목록 API 호출
import { useSuspenseQuery } from '@tanstack/react-query';

export const ChatingRoomFetch = () => {
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const [showNotice, setShowNotice] = useState(false);
  const [chat, setChat] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const navigate = useNavigate();
  const searchPartiesStore = useSearchPartiesStore();
  const partyList: IParty[] = searchPartiesStore.results?.content || [];
  const nav = useNavigate();

  const chatingQuery = useSuspenseQuery({
    queryKey: ['Chatingroom'],
    queryFn: async () => await getPartyList()
  });
    if (chatingQuery.error && !chatingQuery.isFetching) {
      throw chatingQuery.error;
    }

  // 선택한 파티 찾기
  const selectedParty = chatingQuery.data.data.content.find(party => party.partyId === Number(partyId));

  // 공지사항 토글
  const toggleNotice = () => {
    setShowNotice(!showNotice);
  };

  // 채팅 전송
  const sendChat = () => {
    if (chat.trim()) {
      console.log("보낸 채팅 확인: ", chat);
      setChat(""); // 메시지 전송 후 입력창 비우기
    }
  };

  // 파티 상세보기로 이동하는 함수
  const goToRoomDetail = () => {
    navigate(`/roomdetail/${selectedParty?.partyId}`);
  };


  // 해당 파티가 없는 경우 예외 처리
  if (!selectedParty) {
    return <div>해당 파티가 없습니다.</div>;
  }
  

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" defaultValue="파티 목록" title={selectedParty.roomName} backHandler={() => nav(-1)} />
        {/* 오른쪽에 설정 아이콘 추가 */}
        <Icon size={1.5} color="grey" onClick={goToRoomDetail} style={{ cursor: 'pointer', marginLeft: 'auto' }}>
          <CogIcon />
        </Icon>
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
          <p>공지사항: 28일 4시 반 대구요-api 연결하기</p>
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