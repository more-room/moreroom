/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '../../../components/TopBar';
import {
  container,
  noticeContainer,
  title,
  noticedetail,
  chatbox,
  inputBar,
  input,
} from './styles'; // 필요한 스타일 임포트
import { MegaphoneIcon, CogIcon } from '@heroicons/react/24/solid'; // 설정 아이콘 임포트
import { Icon } from '../../../components/Icon';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'; // 전송 버튼으로 사용할 아이콘
import { useQuery, useSuspenseQueries } from '@tanstack/react-query';
import { getChatList, getChatRoomInfo } from '../../../apis/chatApi'; // 파티 목록 API 호출
import { useChat } from '../../../hooks/useChat';
import { getMyInfo } from '../../../apis/mypageApi';
import { Typography } from '../../../components/Typography';
import { IChatListItem } from '../../../types/chatingTypes';
import { ChatBubble } from './ChatBubble';
import * as StompJs from '@stomp/stompjs';

export const ChatingRoomFetch = () => {
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const divRef = useRef<HTMLDivElement>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [msg, setMsg] = useState('');
  const { stompClient, chatList, getPastChatList, sendChat } = useChat(
    Number(partyId),
  );

  const [roomQuery, userQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['roominfo'],
        queryFn: async () => await getChatRoomInfo(Number(partyId)),
      },
      {
        queryKey: ['userinfo'],
        queryFn: async () => await getMyInfo(),
      },
    ],
  });

  [roomQuery, userQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  const handleScroll = () => {
    if (divRef.current) {
      const scrollTop = divRef.current.scrollTop;

      if (scrollTop <= 0) {
        getPastChatList();
      }
    }
  };

  useEffect(() => {
    getPastChatList();
    if (divRef.current) divRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (divRef.current)
        divRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div css={container}>
      <TopBar style={{ backgroundColor: '#313131' }}>
        <TopBar.Title
          type="default"
          defaultValue="파티 목록"
          title={roomQuery.data.data.roomName}
          backHandler={() => navigate('/chating')}
        />
        {/* 오른쪽에 설정 아이콘 추가 */}
        <Icon
          size={1.5}
          color="grey"
          onClick={() => navigate(`/roomdetail/${partyId}`)}
          style={{ cursor: 'pointer', marginLeft: 'auto' }}
        >
          <CogIcon />
        </Icon>
      </TopBar>

      {/* 공지사항 영역 */}
      <div css={noticeContainer} onClick={() => setShowNotice((prev) => !prev)}>
        <div css={title}>
          <Icon size={1.5} color="secondary">
            <MegaphoneIcon />
          </Icon>
          <Typography color="light">공지 사항 제목</Typography>
        </div>
        <Typography color="secondary">{showNotice ? '▲' : '▼'}</Typography>
      </div>

      {/* 공지사항 내용 */}
      {showNotice && (
        <div css={noticedetail}>
          <Typography color="light" weight={400}>
            공지사항: 28일 4시 반 대구요-api 연결하기
          </Typography>
        </div>
      )}

      {/* 채팅 내역 */}
      <div ref={divRef} css={chatbox}>
        {chatList.map((chat: IChatListItem) => {
          return (
            <ChatBubble
              key={chat.messageId}
              isMine={chat.nickname === userQuery.data.data.nickname}
              chat={chat}
            />
          );
        })}
      </div>
      {/* 입력 폼 */}
      <div css={inputBar}>
        <input
          type="text"
          placeholder="채팅 내용"
          css={input}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              sendChat(msg);
            }
          }}
        />
        <Icon
          color="light"
          size={1.5}
          onClick={() => msg.trim().length && sendChat(msg)}
        >
          <ArrowUpCircleIcon />
        </Icon>
      </div>
    </div>
  );
};
