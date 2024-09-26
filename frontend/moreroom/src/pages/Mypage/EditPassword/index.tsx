/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../../components/TopBar';
import { EmailVerification } from './EmailVerification';
import { Progress } from '../../../components/Progress';

export const EditPassword = () => {
  const nav = useNavigate();

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="비밀번호 변경"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <Progress color="primary" max={2} size="md" value={1} variant="rounded" />
      <EmailVerification/>
    </div>
  );
};
