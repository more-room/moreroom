/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../../components/Typography';
import { containerCss } from './styles';

interface ManageInfoProps {
  icon: JSX.Element;
  children?: React.ReactNode;
  chips?: React.ReactNode;
  url?: string;
  onApi?: () => void
  statedata?: any; // 공식적으로 state는 any라 이걸로 함
}

export const ManageInfo = ({ icon, children, chips, url, statedata, onApi }: ManageInfoProps) => {
  const nav = useNavigate();

  return (
    <div css={containerCss}>
      <div>{icon}</div>
      <div>
        {children && (
          <Typography
            color="light"
            scale="400"
            size={1}
            weight={500}
            onClick={url ? () => nav(url, { state : {statedata} }) : onApi}
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
