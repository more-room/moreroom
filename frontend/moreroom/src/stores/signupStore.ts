import { create } from 'zustand';
import { ISignUP } from '../types/mypageTypes';

type SignUpAction = {
  setSignUpData: (data: Partial<ISignUP>) => void;

}

export const useSignUpStore = create<ISignUP & SignUpAction>()((set) => ({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  gender: undefined,
  birth: '',
  genreIdList: [],
  regionId: '',

  // 입력된 데이터를 업데이트하는 함수
  setSignUpData: (data) => set((state) => ({ ...state, ...data })),
}));
