/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../../../components/TopBar';
import { Progress } from '../../../../components/Progress';
import { Transition } from '../../../../components/common/Transition';
import { EmailVerification } from './EmailVerification';
import { Password } from './Password';

export const EditPassword = () => {
  const nav = useNavigate();
  const [step, setStep] = useState<number>(0);
  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="비밀번호 변경"
          backHandler={() => nav('/', { state: { menu: 4 } })}
        />
      </TopBar>
      <Progress
        color="primary"
        max={2}
        size="md"
        value={step + 1}
        variant="rounded"
      />
      <Transition
        data-key={step.toString()}
        // wrapperCss={{ padding: '20px' }} // 간단한 스타일 적용
      >
        <EmailVerification key={0} onSubmit={() => setStep(1)} />
        <Password key={1} />
      </Transition>
    </div>
  );
};
