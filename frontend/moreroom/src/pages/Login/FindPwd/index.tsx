/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { Button } from '../../../components/Button';
import {
  btnCss,
  containerCss,
  inputCss,
} from '../../Signup/AccountInfo/styles';
import { CssTextField } from '../../Signup/AccountInfo';
import { Typography } from '../../../components/Typography';
import { isEmail } from '../../../apis/authApi';
import { validateEmail } from '../../../utils/validationUtils';
import { tmpPwd } from '../../../apis/loginApi';
import { Progress } from '../../../components/Progress';
import { Transition } from '../../../components/common/Transition';
import { EmailVerificaion } from './EmailVerification';
import { PwdDone } from './PwdDone';

export const FindPwd = () => {
  const nav = useNavigate();
  const [step, setStep] = useState<number>(0);

  return (
    <>
      <TopBar>
        <TopBar.Title
          type="default"
          title="비밀번호 찾기"
          backHandler={() => nav(-1)}
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
        <EmailVerificaion key={0} onSubmit={() => setStep(1)} />
        <PwdDone key={1} />
      </Transition>
    </>
  );
};
