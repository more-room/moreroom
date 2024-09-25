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
