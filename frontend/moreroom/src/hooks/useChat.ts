import * as StompJs from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { IChatListItem } from '../types/chatingTypes';
import { getChatList } from '../apis/chatApi';
import { useQuery } from '@tanstack/react-query';

export const useChat = (partyId: number) => {
  /* 채팅 내역 */
  const [chatList, setChatList] = useState<IChatListItem[]>([]);
  const [lastMessageId, setLastMessageId] = useState<string | undefined>(
    undefined,
  );
  const chatQuery = useQuery({
    queryKey: ['pastchat'],
    queryFn: async () => await getChatList(Number(partyId), lastMessageId),
    enabled: false,
  });
  const stompClient = useRef<StompJs.Client | null>(null);

  /* 채팅 내역 가져오기 */
  const getPastChatList = async () => {
    const response = await chatQuery.refetch();
    setLastMessageId(response.data?.data.lastMessageId);
    setChatList((prev) => {
      const after = response.data
        ? response.data.data.messageList.reverse()
        : [];
      return [...after, ...prev];
    });
  };

  /* 채팅 추가 */
  const addChat = (chat: IChatListItem) => {
    setChatList((prev) => [...prev, chat]);
  };

  /* 채팅 전송 */
  function sendChat(msg: string) {
    if (stompClient.current?.active) {
      stompClient.current?.publish({
        destination: process.env.REACT_APP_CHAT_DEST!,
        body: JSON.stringify({
          partyId: partyId,
          message: msg,
        }),
      });
    } else {
      console.log(stompClient.current?.active);
    }
  }

  useEffect(() => {
    /* 소켓 연결 정보 */
    stompClient.current = new StompJs.Client({
      brokerURL: process.env.REACT_APP_CHAT_SOCKET,
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

  return { stompClient, chatList, getPastChatList, sendChat };
};
