/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../../components/TopBar';
import { Progress } from '../../../components/Progress';

export const Done = () => {
  const nav = useNavigate();
  return (
    <>
      <TopBar>
        <TopBar.Title
          type="default"
          title="회원가입"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <Progress color="primary" max={4} size="md" value={4} variant="rounded" />
      <Typography color="light" size={1.25} weight={700}>
        회원가입이 완료되었습니다.
      </Typography>
      <Typography color="light" size={1.25} weight={700}>
        회원가입 ㅊㅋ ㅋㅋ
      </Typography>
      <div>
        <Button
          style={{ margin: '2rem 0' }}
          fullwidth
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={() => nav('/login')}
        >
          로그인 하러가기
        </Button>
      </div>
    </>
  );
};
