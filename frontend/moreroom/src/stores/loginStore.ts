import { create } from 'zustand';

// 로그인 스토어 타입 정의
type LoginStore = {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  validateEmail: () => void;
  validatePassword: () => void;
  resetFields: () => void;
};

// 로그인 스토어 생성
export const useLoginStore = create<LoginStore>()((set) => ({
  email: '',
  password: '',
  emailError: false,
  passwordError: false,
  setEmail: (email) => set(() => ({ email })),
  setPassword: (password) => set(() => ({ password })),
  
  // 이메일 유효성 검사
  validateEmail: () => set((state) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return { emailError: !emailRegex.test(state.email) };
  }),
  
  // 비밀번호 유효성 검사
  validatePassword: () => set((state) => {
    const passwordRegex = /^[a-zA-Z0-9]{8,}$/; // 소문자 및 숫자 포함 8자 이상
    return { passwordError: !passwordRegex.test(state.password) };
  }),
  
  resetFields: () => set(() => ({ email: '', password: '', emailError: false, passwordError: false })),
}));
