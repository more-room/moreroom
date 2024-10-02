import * as StompJs from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { IChatList, IChatListItem } from '../types/chatingTypes';

export const useChat = (partyId: number) => {
  /* 채팅 내역 */
  const [chatList, setChatList] = useState<IChatList>({ messageList: [] });

  /* 소켓 연결 정보 */
  const stompClient = new StompJs.Client({
    brokerURL: process.env.REACT_APP_CHAT_SOCKET,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  /* 채팅 전송 */
  const sendChat = (msg: string) => {
    stompClient.publish({
      destination: process.env.REACT_APP_CHAT_DEST!,
      body: JSON.stringify({
        partyId: partyId,
        message: msg,
      }),
    });
  };

  /* 채팅 추가 */
  const addChat = (chat: IChatListItem) => {
    setChatList((prev) => ({
      ...prev,
      messageList: [...prev.messageList, chat],
    }));
  };

  /* 소켓 연결 */
  stompClient.onConnect = (frame) => {
    console.log('Connected: ', frame);

    stompClient.subscribe(`/topic/party/${partyId}`, (broadcast) => {
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

  stompClient.onStompError = (frame) => {
    console.error('Error: ' + frame.headers['message']);
    console.error('Error details: ' + frame.body);
  };

  /* 연결 & 해제 */
  useEffect(() => {
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  useEffect(() => {
    console.log(chatList.messageList);
  }, [chatList]);

  return { chatList, sendChat };
};
