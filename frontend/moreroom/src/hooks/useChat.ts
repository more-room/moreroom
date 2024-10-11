import * as StompJs from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import { IChatListItem } from '../types/chatingTypes';
import { getChatList } from '../apis/chatApi';
import { useQuery } from '@tanstack/react-query';
import { useChatingRoomStore } from '../stores/chatingroomStore';

export const useChat = (partyId: number) => {
  const chat = useChatingRoomStore();
  const stompClient = useRef<StompJs.Client | null>(null);
  const chatQuery = useQuery({
    queryKey: ['pastchat'],
    queryFn: async () => await getChatList(Number(partyId), chat.lastMessageId),
    enabled: false,
  });

  /* 채팅 내역 가져오기 */
  const getPastChatList = async () => {
    const response = await chatQuery.refetch();

    if (response.data) {
      chat.setLastMessageId(response.data.data.lastMessageId);
      chat.addOldChatList(response.data.data.messageList);
    } else {
      console.log('query error');
    }
  };

  /* 채팅 추가 */
  const addChat = (newChat: IChatListItem) => {
    chat.addNewChat(newChat);
  };

  /* 채팅 전송 */
  const sendChat = async (msg: string) => {
    stompClient.current?.publish({
      destination: '/app/chat/message',
      body: JSON.stringify({
        partyId: partyId,
        message: msg,
      }),
    });
  };

  useEffect(() => {
    /* 소켓 연결 정보 */
    stompClient.current = new StompJs.Client({
      brokerURL: 'wss://j11d206.p.ssafy.io/api/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    /* 소켓 연결 */
    stompClient.current.onConnect = (frame) => {
      console.log('Connected: ', frame);

      stompClient.current?.subscribe(`/topic/party/${partyId}`, (broadcast) => {
        console.log('headers', broadcast.headers);
        console.log('body', JSON.parse(broadcast.body));

        let headers = broadcast.headers;
        let body = JSON.parse(broadcast.body);

        addChat({
          messageId: body.messageId,
          nickname: headers.nickname,
          photo: headers.photo,
          message: body.message,
        });
      });
    };

    stompClient.current.onStompError = (frame) => {
      console.error('Error: ' + frame.headers['message']);
      console.error('Error details: ' + frame.body);
    };

    stompClient.current?.activate();

    return () => {
      stompClient.current?.deactivate();
    };
  }, [partyId]);

  return { stompClient, getPastChatList, sendChat };
};
