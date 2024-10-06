/** @jsxImportSource @emotion/react */
import React from 'react';
import { CloudIcon } from '@heroicons/react/24/outline';
import { containerCss, fitCss, textCss } from './styles';
import { Icon } from '../../Icon';
import { Typography } from '../../Typography';
import { Button } from '../../Button';
import { useNavigate } from 'react-router-dom';

interface NoResultProps {
  fit?: boolean;
  msg: string;
  url: string;
  btnmsg: string;
}

const NoResult = ({ fit = true, msg, url, btnmsg }: NoResultProps) => {
  const nav = useNavigate();
  return (
    <div css={[containerCss, fit && fitCss]}>
      <Icon size={5} color="grey">
        <CloudIcon />
      </Icon>
      <Typography size={1} color="grey" css={textCss}>
        {msg}
      </Typography>
      <Button
        color="primary"
        handler={() => nav(url)}
        rounded={0.5}
        variant="contained"
      >
        {btnmsg}
      </Button>
    </div>
  );
};

export default NoResult;