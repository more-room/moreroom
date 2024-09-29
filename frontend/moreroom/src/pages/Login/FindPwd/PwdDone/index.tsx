/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { btnCss, containerCss } from '../../../Signup/AccountInfo/styles';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../../../components/TopBar';

export const PwdDone = () => {
  const nav = useNavigate();
  return (
    <>
      <div css={containerCss}>
        <Typography color="light" size={1} weight={500}>
          email로 임시 비밀번호를 발송하였습니다.
          <br />
          임시 비밀번호로 로그인 하신 후 마이페이지에서 비밀번호를 수정해주세요.
        </Typography>
        <Button
          css={btnCss}
          style={{ margin: '2rem 0' }}
          fullwidth
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={() => {
            nav('/login');
          }}
        >
          로그인 하러 가기
        </Button>
      </div>
    </>
  );
};
