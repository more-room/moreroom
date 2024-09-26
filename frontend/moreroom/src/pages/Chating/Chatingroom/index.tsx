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

export const ChatingRoom = () => {
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const [showNotice, setShowNotice] = useState(false);
  const [chat, setChat] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const navigate = useNavigate();
  const searchPartiesStore = useSearchPartiesStore();
  const partyList: IParty[] = searchPartiesStore.results?.content || [];
  const nav = useNavigate();

  useEffect(() => {
    if (partyList.length === 0) {
      // 파티 목록을 가져오는 API 호출
      getPartyList()
        .then(response => {
          searchPartiesStore.setResults(response.data); // 스토어에 데이터 설정
          setIsLoading(false); // 데이터 로드 완료
        })
        .catch(error => {
          console.error("데이터 로드 중 오류 발생:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); // 이미 데이터가 존재하면 로딩 해제
    }
  }, [partyList, searchPartiesStore]);

  // 선택한 파티 찾기
  const selectedParty = partyList.find(party => party.partyId === Number(partyId));

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

  // 데이터가 로드 중일 때 로딩 메시지 표시
  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

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

      {/* 파티 상세 정보 */}
    </div>
  );
};
