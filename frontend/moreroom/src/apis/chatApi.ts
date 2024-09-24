import { api } from './interceptors';

// 파티 목록을 가져오는 함수
export const getPartyList = () => {
  return api.get('/api/party');
};

// 특정 파티의 상세 정보를 가져오는 함수 (partyId 기준)
export const getPartyDetail = (partyId: number) => {
  return api.get(`/api/party/${partyId}`);
};
