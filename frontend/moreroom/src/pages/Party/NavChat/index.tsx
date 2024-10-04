/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { addCss, containerCss, navCss } from './styles';
import { Icon } from '../../../components/Icon';
import { PlusIcon } from '@heroicons/react/24/solid';

export const NavChat = () => {
  const nav = useNavigate();
  return (
    <div css={containerCss}>
      <div css={navCss}>
        <Typography color="light" size={0.9} weight={500}>
          매칭이 완료된 파티
        </Typography>
        <Button
          color="primary"
          rounded={0.5}
          variant="contained"
          handler={() => nav('/chating')}
          style={{ padding: '0.5rem' }}
        >
          <Typography color="light" size={0.75} weight={500}>
            채팅방으로 가기
          </Typography>
        </Button>
      </div>
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
