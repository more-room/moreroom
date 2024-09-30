/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../../components/Progress';
import { AccountInfo } from './AccountInfo';

export const Signup = () => {
  const nav = useNavigate();
  const [step, setStep] = useState<number>(0);
  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="회원가입"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <Progress color="primary" max={4} size="md" value={step+1} variant="rounded" />
      <AccountInfo />
    </div>
  );
};
