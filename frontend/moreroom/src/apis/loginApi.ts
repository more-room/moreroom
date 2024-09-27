import { api } from './interceptors';

export const UserLogin = (email: string, password: string) => {
  return api({
    url: '/api/auth/member/login',
    method: 'post',
    data: {
      email: email,
      password: password,
    },
  });
};

export const UserLogout = () => {
  return api({
    url: '/api/auth/member/logout',
    method: 'post',
  });
};

// 회원정보 - 비밀번호 변경(최종 변경)
export const tmpPwd = (email: string) => {
  return api({
    url: '/api/auth/member/temporary-password',
    method: 'post',
    data: {
      email: email
    },
  });
};