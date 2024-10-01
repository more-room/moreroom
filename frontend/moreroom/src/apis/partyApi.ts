import { api } from './interceptors';

// 파티 등록
export const addParty = (
  themeId: number,
  partyHashtagIdList: number[],
  myHashtagIdList: number[],
  yourHashtagIdList: number[],
) => {
  return api({
    url: '/api/party/partyRequest',
    method: 'post',
    data: {
      themeId: themeId,
      partyHashtagIdList: partyHashtagIdList,
      myHashtagIdList: myHashtagIdList,
      yourHashtagIdList: yourHashtagIdList,
    },
  });
};

// 나의 파티 요청 조회
export const getPartyList = () => {
  return api({
    url: '/api/party/partyRequest',
    method: 'get',
  });
};
