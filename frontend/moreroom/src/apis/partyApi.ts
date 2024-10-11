import { api } from './interceptors';

// 파티요청 등록
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

// 파티 요청 삭제
export const delParty = (partyRequestId: number) => {
  return api({
    url: `/api/party/partyRequest/${partyRequestId}`,
    method: 'delete',
  });
};

// 파티요청 활성화/비활성화
export const disabledParty = (partyRequestId: number, activate: boolean) => {
  return api({
    url: `/api/party/partyRequest/${partyRequestId}`,
    method: 'patch',
    data: {
      activate: activate,
    },
  });
};

// 파티요청 정보 수정
export const updateParty = (
  partyRequestId: number,
  themeId: number,
  partyHashtagIdList: number[],
  myHashtagIdList: number[],
  yourHashtagIdList: number[],
) => {
  return api({
    url: `/api/party/partyRequest/${partyRequestId}/settings`,
    method: 'patch',
    data: {
      themeId: themeId,
      partyHashtagIdList: partyHashtagIdList,
      myHashtagIdList: myHashtagIdList,
      yourHashtagIdList: yourHashtagIdList,
    },
  });
};

// 파티 알림시 가입 승낙
export const partyApprove = (
  accept: boolean,
  uuid: string,
  themeId: number,
) => {
  return api({
    url: '/api/party',
    method: 'post',
    data: {
      accept: accept,
      uuid: uuid,
      themeId: themeId,
    },
  });
};

// 나의 파티요청 해시태그 조회
export const getHashtag = (partyRequestId: string) => {
  return api({
    url: `/api/party/partyRequest/${partyRequestId}/hashtags`,
    method: 'get',
  });
};