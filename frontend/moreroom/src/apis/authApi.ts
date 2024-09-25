import { api } from "./interceptors";

// 회원정보 해시태그 수정
export const isemail = (nickname: string) => {
  return api({
    url: '/api/auth/member/exist-nickname',
    method: 'post',
    data: {
      nickname: nickname,
    },
  });
};