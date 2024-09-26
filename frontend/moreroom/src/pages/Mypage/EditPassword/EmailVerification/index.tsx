/** @jsxImportSource @emotion/react */
import React from 'react';
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

export const EmailVerification = () => {
  const nav = useNavigate();
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
              // error={!!emailError}
              label="이메일"
              id="custom-css-outlined-input"
              placeholder="abc@gmail.com"
              // value={email}
              // onChange={handleEmailChange}
            />
          </div>
          <Button
            css={btnCss}
            color="primary"
            rounded={0.5}
            scale="A200"
            variant="contained"
            handler={() => {}}
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
              // error={!!emailcodeError}
              label="인증번호"
              id="custom-css-outlined-input"
              placeholder="XXXXXX"
              // value={code}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   setCode(e.target.value);
              // }}
            />
          </div>
          <Button
            css={btnCss}
            color="primary"
            rounded={0.5}
            scale="A200"
            variant="contained"
            handler={() => {}}
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
          handler={() => {nav('mypage/password/edit2')}}
        >
          다음으로
        </Button>
      </div>
    </>
  );
};
