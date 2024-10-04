/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { FormHelperText, IconButton, InputAdornment, TextField, styled } from '@mui/material';
import { Button } from '../../../components/Button';
import { btnCss, inputCss, containerCss } from './styles';
import { useNavigate } from 'react-router-dom';
import {
  isEmail,
  isNickname,
  sendEmail,
  verifyCode,
} from '../../../apis/authApi';
import { useSignUpStore } from '../../../stores/signupStore';
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from '../../../utils/validationUtils';
import { CssTextField } from '../../../components/Mui/CssTextField';
import { iconcolors } from '../../Login/styles';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface UserDataFormProps {
  onSubmit: () => void;
}

type FormField = 'email' | 'password' | 'passwordCheck' | 'nickname';
type UserDateValidation = Record<FormField, boolean>;

export const AccountInfo = ({ onSubmit }: UserDataFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [available, setAvailable] = useState<boolean>(false);
  const { setSignUpData } = useSignUpStore();

  const [check, setCheck] = useState<UserDateValidation>({
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  });
  const [emailError, setEmailError] = useState<string>('');
  const [emailcodeError, setEmailcodeError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordCheckError, setPasswordCheckError] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기/숨기기 상태
  const [showPasswordCheck, setShowPasswordCheck] = useState(false); // 비밀번호 보기/숨기기 상태
  // 이메일 유효성 검사
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  // 비밀번호 유효성 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
    if (passwordError === '') {
      setCheck((prevCheck) => ({
        ...prevCheck,
        password: true,
      }));
    }
    console.log(check);
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCheckPassword(value);

    if (value.length === 0) {
      setPasswordCheckError('비밀번호를 입력해주세요');
    } else if (value !== password) {
      setPasswordCheckError('입력하신 비밀번호랑 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }

    if (value === password) {
      setCheck((prevCheck) => ({
        ...prevCheck,
        passwordCheck: true,
      }));
    } else {
      setCheck((prevCheck) => ({
        ...prevCheck,
        passwordCheck: false,
      }));
    }
  };

  // 닉네임 유효성 검사
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(validateNickname(e.target.value));
  };

  const handleSignUp = () => {
    setSignUpData({ email, password, passwordCheck: checkPassword, nickname });

    // 현재 스토어에 잘 저장되어있는 지 확인
    const curdata = useSignUpStore.getState();
    console.log('현재 데이터:', curdata);
    onSubmit();
  };
  const isEmailed = async () => {
    try {
      const response = await isEmail(email);
      console.log(response);
      if (response.data.duplicated === 'False') {
        console.log('존재하지 않는 이메일입니다.');
        sendNumber();
      }
    } catch (err) {
      setEmailError('이미 존재하는 이메일입니다.');
    }
  };

  const sendNumber = async () => {
    try {
      await sendEmail(email);
    } catch (err) {
      console.log('에러:', err);
    }
  };

  const hadleCode = async () => {
    try {
      await verifyCode(email, code);
      setCheck((prevCheck) => ({
        ...prevCheck,
        email: true,
      }));
      console.log(check);
    } catch (err) {
      console.log(email, code, err);
      setEmailcodeError('인증번호가 일치하지 않습니다.');
    }
  };

  const isNicknamed = async () => {
    try {
      const response = await isNickname(nickname);
      console.log(response);
      if (response.status === 200) {
        // 응답이 200일 경우
        setCheck((prevCheck) => {
          const newCheck = { ...prevCheck, nickname: true }; // 닉네임 인증 성공
          validate(newCheck); // 업데이트된 상태를 전달
          return newCheck;
        });
      } else {
        setCheck((prevCheck) => {
          const newCheck = { ...prevCheck, nickname: false }; // 닉네임 인증 실패
          validate(newCheck);
          return newCheck;
        });
      }
    } catch (err) {
      console.log(err);
      setNicknameError('닉네임 인증 중 오류가 발생했습니다.');
      setCheck((prevCheck) => {
        const newCheck = { ...prevCheck, nickname: false }; // 예외 발생 시 상태 초기화
        validate(newCheck);
        return newCheck;
      });
    }
  };

  const validate = (updatedCheck: UserDateValidation): boolean => {
    const allTrue = Object.values(updatedCheck).every((value) => value === true);
    setAvailable(allTrue);
    return allTrue;
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordCheck = () => setShowPasswordCheck(!showPasswordCheck);

  return (
    <div css={containerCss}>
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            error={!!emailError}
            label="이메일"
            id="custom-css-password-input"
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <Button
          css={btnCss}
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={isEmailed}
        >
          전송
        </Button>
      </div>
      <FormHelperText error id="component-error-text">
        {emailError}
      </FormHelperText>
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            error={!!emailcodeError}
            label="인증번호"
            id="custom-css-outlined-input"
            placeholder="XXXXXX"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <Button
          css={btnCss}
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={hadleCode}
        >
          확인
        </Button>
      </div>
      <FormHelperText error id="component-error-text">
        {emailcodeError}
      </FormHelperText>
      <div css={inputCss}>
        <CssTextField
          fullWidth
          error={!!passwordError}
          label="비밀번호"
          id="custom-css-outlined-input"
          type={showPassword ? "text" : "password"}
          placeholder="영문, 숫자 포함 8글자 이상"
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton css={iconcolors} onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handlePasswordChange}
        />
      </div>
      <FormHelperText error id="component-error-text">
        {passwordError}
      </FormHelperText>
      <div css={inputCss}>
        <CssTextField
          fullWidth
          error={!!passwordCheckError}
          label="비밀번호 확인"
          id="custom-css-outlined-input"
          placeholder="영문, 숫자 포함 8글자 이상"
          value={checkPassword}
          type={showPasswordCheck ? "text" : "password"} // 비밀번호 보이기/숨기기 상태
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton css={iconcolors} onClick={handleClickShowPasswordCheck}>
                  {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handlePasswordCheck}
        />
      </div>
      <FormHelperText error id="component-error-text">
        {passwordCheckError}
      </FormHelperText>
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            error={!!nicknameError}
            label="닉네임"
            id="custom-css-outlined-input"
            placeholder="한글, 영어, 숫자 상관없이 2~7글자"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <Button
          css={btnCss}
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={isNicknamed}
        >
          확인
        </Button>
      </div>
      <FormHelperText error id="component-error-text">
        {nicknameError}
      </FormHelperText>
      <Button
        css={btnCss}
        style={{ margin: '2rem 0' }}
        fullwidth
        color="primary"
        rounded={0.5}
        scale="A200"
        variant="contained"
        disabled={!available}
        handler={handleSignUp}
      >
        다음으로
      </Button>
    </div>
  );
};
