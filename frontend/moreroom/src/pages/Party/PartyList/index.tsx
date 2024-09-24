/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './styles';
import { Typography } from '../../../components/Typography';
import { Icon } from '../../../components/Icon';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export const PartyList = () => {
  const nav = useNavigate();
  return (
    <div
      css={containerCss}
      onClick={() => {
        nav('/party/register');
      }}
    >
      <Icon color="grey" scale="500" size={1.875}>
        <PlusIcon />
      </Icon>
      <Typography color="light" size={1} weight={500}>
        파티를 등록해주세요
      </Typography>
    </div>
  );
};
