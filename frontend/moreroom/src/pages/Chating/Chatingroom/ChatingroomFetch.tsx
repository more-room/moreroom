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
import { useSuspenseQueries } from '@tanstack/react-query';
import { getChatRoomInfo, getNotice } from '../../../apis/chatApi'; // 파티 목록 API 호출
import { useChat } from '../../../hooks/useChat';
import { getMyInfo } from '../../../apis/mypageApi';
import { Typography } from '../../../components/Typography';
import { IChatListItem } from '../../../types/chatingTypes';
import { ChatBubble } from './ChatBubble';
import { useChatingRoomStore } from '../../../stores/chatingroomStore';

export const ChatingRoomFetch = () => {
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [msg, setMsg] = useState('');
  const { getPastChatList, sendChat } = useChat(Number(partyId));
  const chat = useChatingRoomStore();
  const isUser = useRef<boolean>(false);

  const [roomQuery, userQuery, noticeQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['roominfo'],
        queryFn: async () => await getChatRoomInfo(Number(partyId)),
      },
      {
        queryKey: ['userinfo'],
        queryFn: async () => await getMyInfo(),
      },
      {
        queryKey: ['notice'],
        queryFn: async () => await getNotice(Number(partyId)),
      },
    ],
  });

  [roomQuery, userQuery, noticeQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  /* 과거 채팅 내역 조회 & 스크롤 유지 */
  const fetchMoreDatea = async () => {
    const prevScrollHeight = divRef.current?.scrollHeight;
    const prevScrollTop = divRef.current?.scrollTop;

    await getPastChatList();

    requestAnimationFrame(() => {
      if (divRef.current) {
        const newScrollHeight = divRef.current.scrollHeight;
        if (prevScrollHeight && prevScrollTop !== undefined) {
          divRef.current.scrollTop =
            newScrollHeight - prevScrollHeight + prevScrollTop;
        }
      }
    });
  };

  /* 스크롤 핸들러 */
  const handleScroll = async () => {
    if (divRef.current) {
      const scrollTop = divRef.current.scrollTop;

      if (scrollTop <= 0) {
        await fetchMoreDatea();
      }
    }
  };

  /* 채팅 전송 핸들러 */
  const handleSendingChat = () => {
    if (!msg.trim().length) return;

    sendChat(msg.trim());
    isUser.current = true;
  };

  useEffect(() => {
    getPastChatList();
    if (divRef.current) divRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (divRef.current)
        divRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* 새로운 채팅이 입력되면 화면 최하단으로 이동 */
  useEffect(() => {
    if (isUser.current && divRef.current) {
      if (inputRef.current) inputRef.current.value = '';
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: 'smooth',
      });
      isUser.current = false;
    }
  }, [chat.chatList]);

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
          <Typography color="light">{noticeQuery.data.data.notice}</Typography>
        </div>
        <Typography color="secondary">{showNotice ? '▲' : '▼'}</Typography>
      </div>

      {/* 공지사항 내용 */}
      {showNotice && (
        <div css={noticedetail}>
          <Typography color="light" weight={400}>
            {noticeQuery.data.data.notice}
          </Typography>
        </div>
      )}

      {/* 채팅 내역 */}
      <div ref={divRef} css={chatbox}>
        {chat.chatList.map((chat: IChatListItem) => {
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
          ref={inputRef}
          placeholder="채팅 내용"
          css={input}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              handleSendingChat();
            }
          }}
        />
        <Icon color="light" size={1.5} onClick={() => handleSendingChat()}>
          <ArrowUpCircleIcon />
        </Icon>
      </div>
    </div>
  );
};
