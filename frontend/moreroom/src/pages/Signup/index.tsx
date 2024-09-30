/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../../components/Progress';
import { AccountInfo } from './AccountInfo';
import { Transition } from '../../components/common/Transition';
import { Done } from './Done';
import { GenreInfo } from './GenreInfo';
import { ProfileInfo } from './ProfileInfo';

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
      <Progress
        color="primary"
        max={4}
        size="md"
        value={step + 1}
        variant="rounded"
      />
      <Transition
        data-key={step.toString()}
        // wrapperCss={{ padding: '20px' }}
      >
        <AccountInfo key={0} onSubmit={() => setStep(1)} />
        <ProfileInfo key={1} onSubmit={() => setStep(2)} />
        <GenreInfo key={2} onSubmit={() => setStep(3)} />
        <Done key={3} />
      </Transition>
    </div>
  );
};
