/** @jsxImportSource @emotion/react */
import { FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '../../../../components/Button';
import {
  btnCss,
  containerCss,
  inputCss,
} from '../../../Signup/AccountInfo/styles';
import { CssTextField } from '../../../Signup/AccountInfo';
import { Typography } from '../../../../components/Typography';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../../../utils/validationUtils';
import { pwdChange } from '../../../../apis/mypageApi';

export const Password = () => {
  const nav = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');

  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordCheckError, setPasswordCheckError] = useState<string>('');

  // 비밀번호 유효성 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password)
    setPasswordError(validatePassword(e.target.value));
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
    console.log(checkPassword)
    if (checkPassword.length === 0) {
      setPasswordCheckError('비밀번호를 입력해주세요');
    } else if (password !== checkPassword) {
      setPasswordCheckError('입력하신 비밀번호랑 일치하지 않습니다.');
    }
  };

  const goPwdCheck = async () => {
    try {
      await pwdChange(password, checkPassword);
      nav('/mypage')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div css={containerCss}>
        <Typography color="light" size={1} weight={500}>
          비밀번호를 입력해주세요.
        </Typography>
        <div css={inputCss}>
          <CssTextField
            fullWidth
            error={!!passwordError}
            label="비밀번호"
            id="custom-css-outlined-input"
            placeholder="영문, 숫자 포함 8글자 이상"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <FormHelperText error id="component-error-text">
          {/* {passwordError} */}
        </FormHelperText>
        <div css={inputCss}>
          <CssTextField
            fullWidth
            error={!!passwordCheckError}
            label="비밀번호 확인"
            id="custom-css-outlined-input"
            placeholder="영문, 숫자 포함 8글자 이상"
            value={checkPassword}
            onChange={handlePasswordCheck}
          />
        </div>
        <FormHelperText error id="component-error-text">
          {passwordCheckError}
        </FormHelperText>
        <Button
          css={[btnCss]}
          style={{ margin: '2rem 0' }}
          fullwidth
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={goPwdCheck}
        >
          비밀번호 변경하기
        </Button>
      </div>
    </>
  );
};
