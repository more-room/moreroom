import {
  IChatList,
  IChatRoomInfo,
  INotice,
  IParty,
  IPartyResponse,
  IMemberListResponse,
  
} from '../types/chatingTypes';
import { api } from './interceptors';

// 파티 목록을 가져오는 함수
export const getPartyList = () => {
  return api.get<IPartyResponse>('/api/party');
};

// 특정 파티의 상세 정보를 가져오는 함수 (partyId 기준)
export const getPartyDetail = (partyId: number) => {
  return api.get<IParty>(`/api/party/${partyId}`);
};

// 사용자가 가입한 파티 목록을 가져오는 함수
export const getMyPartyList = () => {
  return api.get<IPartyResponse>('/api/party/member');
};

// 채팅방 정보 조회
export const getChatRoomInfo = (partyId: number) => {
  return api.get<IChatRoomInfo>(`/api/party/${partyId}/settings`);
};

// 채팅방 정보 수정
export const patchChatRoomInfo = (partyId: number, data: Partial<IChatRoomInfo>) => {
  return api.patch<IChatRoomInfo>(`/api/party/${partyId}/settings`, data);
};


// 채팅방 채팅 내역
export const getChatList = (partyId: number, lastMessageId?: string) => {
  return api.get<IChatList>('/api/party/chatLogs', {
    params: {
      partyId: partyId,
      lastMessageId: lastMessageId,
    },
  });
};

// 채팅방 공지사항 조회
export const getNotice = (partyId: number) => {
  return api.get<INotice>(`/api/party/${partyId}/notice`);
};

// 채팅방 공지사항 등록
export const registerNotice = (partyId: number, notice: string) => {
  return api.post(`/api/party/${partyId}/notice`, {
    notice: notice,
  });
};


// 채팅의 파티원 조회
export const getPartyMembers = (partyId: number) => {
  return api.get<IMemberListResponse>(`/api/party/${partyId}/memberList`);
};