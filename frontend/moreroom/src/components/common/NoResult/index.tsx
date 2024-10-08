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
  url?: string;
  contents?: object;
  btnmsg?: string;
}

const NoResult = ({ fit = true, msg, url, contents, btnmsg }: NoResultProps) => {
  const nav = useNavigate();
  const handleButtonClick = () => {
    if(contents) {
      nav(url!, {state: contents});
    } else {
      nav(url!);
    }
  };
  return (
    <div css={[containerCss, fit && fitCss]}>
      <Icon size={5} color="grey">
        <CloudIcon />
      </Icon>
      <Typography size={1} color="grey" css={textCss}>
        {msg}
      </Typography>
      {url ? <Button
        color="primary"
        handler={handleButtonClick}
        rounded={0.5}
        variant="contained"
      >
        {btnmsg}
      </Button> : undefined }
    </div>
  );
};

export default NoResult;
