/** @jsxImportSource @emotion/react */
import React from 'react';
import { empty } from './styles';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';

export const Empty = () => {
  const nav = useNavigate();

  return (
    <div css={empty}>
      <Typography color="light" size={1} weight={600}>
        파티 매칭 요청하러 가기
      </Typography>
      <Button rounded={0.5} handler={() => nav('/party/register')}>
        <Typography color="light" size={0.875} weight={500}>
          매칭 등록
        </Typography>
      </Button>
    </div>
  );
};
