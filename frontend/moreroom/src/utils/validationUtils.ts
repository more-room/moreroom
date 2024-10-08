// 이메일 유효성 검사
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return '이메일을 입력해주세요.';
  } else if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return '';
};

// 비밀번호 유효성 검사
export const validatePassword = (password:string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/; // 소문자 및 숫자 포함 8자 이상
  if (!password) {
    return '비밀번호를 입력해주세요.';
  } else if (!passwordRegex.test(password)) {
    return '비밀번호는 최소 8자이며, 문자와 숫자를 포함해야 합니다.';
  }
  return '';
};

// 닉네임 유효성 검사
export const validateNickname = (nickname:string) => {
  // const nicknameRegex = /^[a-zA-Z가-힣0-9]{2,7}$/;
  const nicknameRegex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\s]{2,7}$/;

  if (!nickname) {
    return '닉네임을 입력해주세요.';
  } else if (!nicknameRegex.test(nickname)) {
    return '닉네임은 2~7글자로 작성해주세요.';
  }
  return '';
};