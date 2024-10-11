/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { Button } from '../../../components/Button';
import { btnCss, inputCss, containerCss, iconcolors } from './styles';
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
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Colors } from '../../../styles/globalStyle';

interface UserDataFormProps {
  onSubmit: () => void;
}

type FormField = 'email' | 'code' | 'password' | 'passwordCheck' | 'nickname';
type UserDateValidation = Record<FormField, boolean>;

export const AccountInfo = ({ onSubmit }: UserDataFormProps) => {
  const signUpStore = useSignUpStore();
  const [email, setEmail] = useState<string>(signUpStore.email);
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>(signUpStore.password);
  const [checkPassword, setCheckPassword] = useState<string>(
    signUpStore.passwordCheck,
  );
  const [nickname, setNickname] = useState<string>(signUpStore.nickname);
  const [isNicknameVerified, setIsNicknameVerified] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);

  const [check, setCheck] = useState<UserDateValidation>({
    email: false,
    code: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  });

  const [emailError, setEmailError] = useState<string>('');
  const [emailcodeError, setEmailcodeError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordCheckError, setPasswordCheckError] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [codemsg, setcodemsg] = useState<string>('');
  const [namemsg, setnamemsg] = useState<string>('');
  const [emailmsg, setEmailmsg] = useState<string>('');
  // 이메일 유효성 검사
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const error = validateEmail(e.target.value);
    setEmailError(error);

    setCheck((prevCheck) => {
      const newCheck = { ...prevCheck, email: error === '' };
      validate(newCheck); // 항상 validate 호출
      return newCheck;
    });
  };

  // 비밀번호 유효성 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const error = validatePassword(e.target.value);
    setPasswordError(error);

    setCheck((prevCheck) => {
      const newCheck = { ...prevCheck, password: error === '' };
      validate(newCheck); // 항상 validate 호출
      return newCheck;
    });
  };

  // 비밀번호 확인
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCheckPassword(value);

    const error =
      value !== password ? '입력하신 비밀번호랑 일치하지 않습니다.' : '';
    setPasswordCheckError(error);

    setCheck((prevCheck) => {
      const newCheck = { ...prevCheck, passwordCheck: error === '' };
      validate(newCheck); // 항상 validate 호출
      return newCheck;
    });
  };

  // 닉네임 유효성 검사
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(validateNickname(e.target.value));

    // 닉네임을 변경할 때 인증 상태 리셋
    setIsNicknameVerified(false);
    setnamemsg('')

    if (nicknameError !== '') {
      setCheck((prevCheck) => {
        const newCheck = { ...prevCheck, nickname: false };
        validate(newCheck);
        return newCheck;
      });
    }
  };

  // 유효성 검사 함수
  const validate = (updatedCheck: UserDateValidation): boolean => {
    const allTrue = Object.values(updatedCheck).every(
      (value) => value === true,
    );
    setAvailable(allTrue); // 전체 폼의 상태를 최신화
    return allTrue;
  };

  const handleSignUp = () => {
    signUpStore.setSignUpData({
      email,
      password,
      passwordCheck: checkPassword,
      nickname,
    });

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
        setEmailmsg('사용 가능한 이메일입니다.')
        sendNumber();
        setCheck((prevCheck) => {
          const newCheck = { ...prevCheck, email: true };
          validate(newCheck);
          return newCheck;
        });
      }
    } catch (err) {
      setEmailError('이미 존재하는 이메일입니다.');
      setCheck((prevCheck) => {
        const newCheck = { ...prevCheck, email: false };
        validate(newCheck);
        return newCheck;
      });
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
      setCheck((prevCheck) => {
        const newCheck = { ...prevCheck, code: true };
        validate(newCheck);
        setcodemsg('인증이 되었습니다.');
        setEmailcodeError('')
        return newCheck;
      });
      console.log(check);
    } catch (err) {
      console.log(email, code, err);
      setEmailcodeError('인증번호가 일치하지 않습니다.');
      setCheck((prevCheck) => {
        const newCheck = { ...prevCheck, code: false };
        validate(newCheck);
        return newCheck;
      });
    }
  };

  const isNicknamed = async () => {
    try {
      const response = await isNickname(nickname);
      if (response.status === 200) {
        // 인증 완료 시 상태 업데이트
        setIsNicknameVerified(true);
        setCheck((prevCheck) => {
          const newCheck = { ...prevCheck, nickname: true };
          validate(newCheck);
          setnamemsg('사용가능한 닉네임입니다.');
          return newCheck;
        });
      } else {
        setCheck((prevCheck) => {
          const newCheck = { ...prevCheck, nickname: false };
          validate(newCheck);
          return newCheck;
        });
      }
    } catch (err) {
      console.log('닉네임 에러', err);
      // setNicknameError(validateNickname(nickname));
      if (validateNickname(nickname) !== '') {
        setNicknameError(validateNickname(nickname));
      } else {
        setNicknameError('이미 사용 중인 닉네임입니다.');
      }
      setCheck((prevCheck) => {
        const newCheck = { ...prevCheck, nickname: false };
        validate(newCheck);
        return newCheck;
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordCheck = () =>
    setShowPasswordCheck(!showPasswordCheck);

  return (
    <div css={containerCss}>
      {/* 이메일 입력 */}
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            error={!!emailError}
            label="이메일"
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <Button
          css={btnCss}
          color="primary"
          rounded={0.5}
          variant="contained"
          handler={isEmailed}
        >
          전송
        </Button>
      </div>
      <FormHelperText sx={{ color: Colors['secondary']['200'] }}>
        {!emailError ? emailmsg : undefined}
      </FormHelperText>
      <FormHelperText error id="component-error-text">
        {emailError}
      </FormHelperText>

      {/* 인증번호 입력 */}
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            error={!!emailcodeError}
            label="인증번호"
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
          disabled={!check.email}
          variant="contained"
          handler={hadleCode}
        >
          확인
        </Button>
      </div>
      <FormHelperText sx={{ color: Colors['secondary']['200'] }}>
        {codemsg}
      </FormHelperText>
      <FormHelperText error id="component-error-text">
        {emailcodeError}
      </FormHelperText>

      {/* 비밀번호 입력 */}
      <div css={inputCss}>
        <CssTextField
          fullWidth
          error={!!passwordError}
          label="비밀번호"
          id="custom-css-outlined-input"
          type={!showPassword ? 'text' : 'password'}
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

      {/* 비밀번호 확인 */}
      <div css={inputCss}>
        <CssTextField
          fullWidth
          error={!!passwordCheckError}
          label="비밀번호 확인"
          placeholder="영문, 숫자 포함 8글자 이상"
          value={checkPassword}
          type={!showPasswordCheck ? 'text' : 'password'} // 비밀번호 보이기/숨기기 상태
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  css={iconcolors}
                  onClick={handleClickShowPasswordCheck}
                >
                  {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handlePasswordCheck}
        />
      </div>

      {/* 닉네임 입력 */}
      <FormHelperText error id="component-error-text">
        {passwordCheckError}
      </FormHelperText>
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            error={!!nicknameError}
            label="닉네임"
            placeholder="영문, 한글, 숫자 상관없이 2~7글자"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <Button
          css={btnCss}
          color="primary"
          rounded={0.5}
          variant="contained"
          handler={isNicknamed}
        >
          확인
        </Button>
      </div>
      <FormHelperText sx={{ color: Colors['secondary']['200'] }}>
        {!nicknameError ? namemsg : undefined}
      </FormHelperText>
      <FormHelperText error id="component-error-text">
        {nicknameError}
      </FormHelperText>

      <Button
        css={btnCss}
        style={{ margin: '2rem 0', float: 'right' }}
        color="primary"
        rounded={0.5}
        variant="contained"
        disabled={!available}
        handler={handleSignUp}
      >
        다음
      </Button>
    </div>
  );
};
