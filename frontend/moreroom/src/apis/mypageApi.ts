import { api } from './interceptors';

// 마이페이지 프로필 조회
export const getMyInfo = () => {
  return api({
    url: '/api/auth/member',
    method: 'get',
  });
};

// 유저페이지(다른 사람 정보)
export const getUserInfo = (memberId: number) => {
  return api({
    url: `/api/auth/member/${memberId}`,
    method: 'get',
  });
};

// 프로필 수정
export const updateUserInfo = (
  newNickname: string,
  gender: string,
  birth: string,
  newRegionId: string,
  clearRoom: number,
) => {
  return api({
    url: '/api/auth/member',
    method: 'patch',
    data: {
      nickname: newNickname,
      gender: gender,
      birth: birth,
      regionId: newRegionId,
      clearRoom: clearRoom,
    },
  });
};

// 회원정보 해시태그 수정
export const updateHashtag = (hashtagList: number[]) => {
  return api({
    url: '/api/auth/member/hashtag',
    method: 'patch',
    data: {
      hashtagList: hashtagList,
    },
  });
};

// 회원정보 - 비밀번호 변경(최종 변경)
export const pwdChange = (newPassword: string, newPasswordCheck: string) => {
  return api({
    url: '/api/auth/member/password-change',
    method: 'post',
    data: {
      newPassword: newPassword,
      newPasswordCheck: newPasswordCheck,
    },
  });
};
