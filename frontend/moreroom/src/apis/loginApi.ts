import { api } from './interceptors';
import  axios  from 'axios';

export const UserLogin = (email: string, password: string) => {
  return axios.post('http://j11d206.p.ssafy.io/api/auth/member/login', {
    email: email,
    password: password,
  });
};
