/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components/Icon';
import { Typography } from '../../../../components/Typography';
import { containerCss, contentCss } from './styles';

interface ManageInfoProps {
  icon: JSX.Element;
  children?: React.ReactNode;
  chips?: React.ReactNode;
  url?: string;
}

export const ManageInfo = ({ icon, children, chips, url }: ManageInfoProps) => {
  const nav = useNavigate();

  return (
    <div css={containerCss}>
      {icon}
      <div css={contentCss}>
        {children && (
          <Typography
            color="light"
            scale="400"
            size={1}
            weight={500}
            onClick={url ? () => nav(url) : undefined}
          >
            {children}
          </Typography>
        )}
        {chips && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {chips}
          </div>
        )}
        {!children && !chips && (
          <Typography color="grey" scale="400" size={0.875}>
            선택한 항목이 없습니다.
          </Typography>
        )}
      </div>
    </div>
  );
};