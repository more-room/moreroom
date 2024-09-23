import { api } from './interceptors';

export const UserLogin = (email: string, password: string) => {
  return api.post('http://j11d206.p.ssafy.io/api/auth/member/login', {
    email: email,
    password: password,
  });
};
