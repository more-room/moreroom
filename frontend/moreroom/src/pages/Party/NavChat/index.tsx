/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { containerCss } from './styles';

export const NavChat = () => {
  const nav = useNavigate();
  return (
    <div css={containerCss}>
      <Typography color="light" size={0.9} weight={500}>
        파티원이 모두 수락한 파티는
        <br />
        채팅방에서 확인 가능합니다.
      </Typography>
      <Button
        color="primary"
        rounded={0.5}
        variant="contained"
        handler={() => nav('/chating')}
      >
        <Typography color="light" size={0.8} weight={500}>
          채팅방으로 가기
        </Typography>
      </Button>
    </div>
  );
};
