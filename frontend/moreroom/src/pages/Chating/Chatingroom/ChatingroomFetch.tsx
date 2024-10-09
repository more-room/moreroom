/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '../../../components/TopBar';
import {
  noticeContainer,
  title,
  noticedetail,
  chatbox,
  inputBar,
  // input,
  modalContent,
  btnContainerCss,
} from './styles'; 
import { MegaphoneIcon, CogIcon } from '@heroicons/react/24/solid'; 
import { Icon } from '../../../components/Icon';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'; 
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  getChatRoomInfo,
  getNotice,
  registerNotice,
} from '../../../apis/chatApi'; 
import { useChat } from '../../../hooks/useChat';
import { getMyInfo } from '../../../apis/mypageApi';
import { Typography } from '../../../components/Typography';
import { IChatListItem } from '../../../types/chatingTypes';
import { ChatBubble } from './ChatBubble';
import { useChatingRoomStore } from '../../../stores/chatingroomStore';
import { Modal } from '../../../components/Modal'; 
import { Button } from '../../../components/Button'; 
import { container, input, inputbox } from '../Modal/RoomName/styles';

export const ChatingRoomFetch = () => {
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [msg, setMsg] = useState('');
  const [notice, setNotice] = useState('');
  const [tempNotice, setTempNotice] = useState(''); // 임시 공지사항 상태 추가
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
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

  useEffect(() => {
    if (noticeQuery.data) {
      setNotice(noticeQuery.data.data.notice);
    }
  }, [noticeQuery.data]);

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

  /* 공지사항 수정 모달 열기 */
  const handleNoticeEdit = () => {
    setTempNotice(notice); // 모달을 열 때 현재 공지사항을 임시 상태에 저장
    setIsNoticeModalOpen(true);
  };

  /* 공지사항 저장 핸들러 */
  const handleNoticeSave = async () => {
    if (tempNotice.trim().length) {
      await registerNotice(Number(partyId), tempNotice);
      setNotice(tempNotice); // 공지사항 저장 후 notice 상태 업데이트
      setIsNoticeModalOpen(false);
    }
  };

  /* 공지사항 수정 취소 핸들러 */
  const handleNoticeCancel = () => {
    setTempNotice(notice); // 취소 버튼 클릭 시 임시 상태를 원래 공지사항으로 복원
    setIsNoticeModalOpen(false);
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
          backHandler={() => navigate('/', { state: { menu: 1 } })}
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
          <Typography
            color="light"
            onClick={handleNoticeEdit}
            style={{ cursor: 'pointer' }}
          >
            {notice}
          </Typography>
        </div>
        <Typography color="secondary">{showNotice ? '▲' : '▼'}</Typography>
      </div>

      {/* 공지사항 내용 */}
      {showNotice && (
        <div css={noticedetail}>
          <Typography color="light" weight={400}>
            {notice}
          </Typography>
        </div>
      )}

      {/* 공지사항 수정 모달 */}
      {isNoticeModalOpen && (
        <div>
          <Modal height={30}>
            <div css={modalContent}>
              <Typography color="light" size={1} weight={400}>
                공지사항 수정
              </Typography>
              <div css={inputbox}>
                <input
                  type="text"
                  value={tempNotice}
                  onChange={(e) => setTempNotice(e.target.value)}
                  css={input}
                />
              </div>
              <div css={btnContainerCss}
              >
                <Button variant="contained" rounded={0.5} handler={handleNoticeSave}>
                  확인
                </Button>
                <Button variant="outlined" rounded={0.5} handler={handleNoticeCancel}>
                  취소
                </Button>
              </div>
            </div>
          </Modal>
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
