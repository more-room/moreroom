/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { containerCss, navCss } from './styles';

export const NavChat = () => {
  const nav = useNavigate();
  return (
    <div css={containerCss}>
      <div css={navCss}>
        <Typography color="light" size={0.9} weight={500}>
          새로운 파티 등록
        </Typography>
        <Button
          color="secondary"
          rounded={0.5}
          variant="contained"
          handler={() => nav('/party/register')}
          style={{ padding: '0.5rem' }}
        >
          <Typography color="light" size={0.75} weight={500}>
            등록하러 가기
          </Typography>
        </Button>
      </div>
      {/* <div
        css={addCss}
        onClick={() => {
          nav('/party/register');
        }}
      >
        <Icon color="grey" scale="500" size={1.875}>
          <PlusIcon />
        </Icon>
        <Typography color="light" size={0.8} weight={500}>
          파티를 등록해주세요
        </Typography>
      </div> */}
    </div>
  );
};
