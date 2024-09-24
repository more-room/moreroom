import { api } from './interceptors';

export const UserLogin = (email: string, password: string) => {
  return api.post('/api/auth/member/login', {
    email: email,
    password: password,
  });
};
