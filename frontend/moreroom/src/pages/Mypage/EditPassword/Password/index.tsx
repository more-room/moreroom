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
import { TopBar } from '../../../../components/TopBar';
import { Progress } from '../../../../components/Progress';
import { useNavigate } from 'react-router-dom';

export const Password = () => {
  const nav = useNavigate();
  return (
    <>
      <TopBar>
        <TopBar.Title
          type="default"
          title="비밀번호 변경"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <Progress color="primary" max={2} size="md" value={2} variant="rounded" />

      <div css={containerCss}>
        <Typography color="light" size={1} weight={500}>
          비밀번호를 입력해주세요.
        </Typography>
        <div css={inputCss}>
        <CssTextField
          fullWidth
          // error={!!passwordError}
          label="비밀번호"
          id="custom-css-outlined-input"
          placeholder="영문, 숫자 포함 8글자 이상"
          // value={password}
          // onChange={handlePasswordChange}
        />
      </div>
      <FormHelperText error id="component-error-text">
        {/* {passwordError} */}
      </FormHelperText>
      <div css={inputCss}>
        <CssTextField
          fullWidth
          // error={!!passwordCheckError}
          label="비밀번호 확인"
          id="custom-css-outlined-input"
          placeholder="영문, 숫자 포함 8글자 이상"
          // value={checkPassword}
          // onChange={handlePasswordCheck}
        />
      </div>
      <FormHelperText error id="component-error-text">
        {/* {passwordCheckError} */}
      </FormHelperText>
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
          handler={() => {}}
        >
          비밀번호 변경하기
        </Button>
      </div>
    </>
  );
};
