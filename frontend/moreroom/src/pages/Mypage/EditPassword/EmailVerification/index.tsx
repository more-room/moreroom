/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Typography } from '../../../../components/Typography';
import { CssTextField } from '../../../Signup/AccountInfo';
import {
  btnCss,
  containerCss,
  inputCss,
} from '../../../Signup/AccountInfo/styles';
import { Button } from '../../../../components/Button';
import { FormHelperText } from '@mui/material';
import { TopBar } from '../../../../components/TopBar';
import { Progress } from '../../../../components/Progress';
import { useNavigate } from 'react-router-dom';
import { isEmail, sendEmail, verifyCode } from '../../../../apis/authApi';
import { validateEmail } from '../../../../utils/validationUtils';

export const EmailVerification = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [emailcodeError, setEmailcodeError] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
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
    } catch (err) {
      console.log(email, code, err);
      setEmailcodeError('인증번호가 일치하지 않습니다.');
    }
  };
  return (
    <>
      <div css={containerCss}>
        <Typography color="light" size={1} weight={500}>
          인증번호 전송을 위해
          <br />
          가입하신 이메일을 입력해주세요.
        </Typography>
        <div css={inputCss}>
          <div style={{ flex: '1' }}>
            <CssTextField
              fullWidth
              error={!!emailError}
              label="이메일"
              id="custom-css-outlined-input"
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
          {/* {emailError} */}
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
          {/* {emailcodeError} */}
        </FormHelperText>
        <Button
          css={btnCss}
          style={{ margin: '2rem 0' }}
          fullwidth
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={() => {
            nav('/mypage/password/edit2');
          }}
        >
          다음으로
        </Button>
      </div>
    </>
  );
};
