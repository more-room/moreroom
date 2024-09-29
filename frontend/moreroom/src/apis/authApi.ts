import { api } from './interceptors';

export const userSignup = (
  email: string,
  password: string,
  passwordCheck: string,
  nickname: string,
  gender: 'M'|'F'|undefined,
  birth: string,
  genreIdList: number[],
  regionId: string,
) => {
  return api({
    url: '/api/auth/member',
    method: 'post',
    data: {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
      nickname: nickname,
      gender: gender,
      birth: birth,
      genreIdList: genreIdList,
      regionId: regionId,
    },
  });
};

export const sendEmail = (email: string) => {
  return api({
    url: '/api/auth/member/send-email',
    method: 'post',
    data: {
      email: email,
    },
  });
};

export const verifyCode = (email: string, authToken: string) => {
  return api({
    url: 'api/auth/member/check-email',
    method: 'post',
    data: {
      email: email,
      authToken: authToken,
    },
  });
};

export const isNickname = (nickname: string) => {
  return api({
    url: '/api/auth/member/exist-nickname',
    method: 'post',
    data: {
      nickname: nickname,
    },
  });
};

export const isEmail = (email: string) => {
  return api({
    url: '/api/auth/member/exist-email',
    method: 'post',
    data: {
      email: email,
    },
  });
};


export const delUser = () => {
  return api.delete('/api/auth/member');
};
