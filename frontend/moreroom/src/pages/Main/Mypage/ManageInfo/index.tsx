/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components/Icon';
import { Typography } from '../../../../components/Typography';
import { containerCss } from './styles';

interface ManageInfoProps {
  icon: JSX.Element;
  children: React.ReactNode;
  url?: string;
}

export const ManageInfo = ({ icon, children, url }: ManageInfoProps) => {
  const nav = useNavigate();
  return (
    <div css={containerCss}>
      {icon}
      <Typography
        color="light"
        scale="400"
        size={1}
        weight={500}
        onClick={url ? () => nav(url) : undefined}
      >
        {children}
      </Typography>
    </div>
  );
};
