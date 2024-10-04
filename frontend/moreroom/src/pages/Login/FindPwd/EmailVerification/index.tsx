/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { validateEmail } from '../../../../utils/validationUtils';
import { isEmail } from '../../../../apis/authApi';
import { tmpPwd } from '../../../../apis/loginApi';
import { Typography } from '../../../../components/Typography';
import {
  btnCss,
  containerCss,
  inputCss,
} from '../../../Signup/AccountInfo/styles';
import { Button } from '../../../../components/Button';
import { nextStepBtnCss } from './styles';
import { CssTextField } from '../../../../components/Mui/CssTextField';

interface UserDataFormProps {
  onSubmit: () => void;
}

export const EmailVerificaion = ({ onSubmit }: UserDataFormProps) => {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const isEmailed = async () => {
    try {
      const response = await isEmail(email);
      console.log(response);
      if (response.data.duplicated === 'False') {
        console.log('존재하지 않는 이메일입니다.');
      }
    } catch (err) {
      tmpPwd(email);
      setStep(1)
    }
  };

  return (
    <>
      <div css={containerCss}>
        <Typography color="light" size={1} weight={500}>
          인증번호 전송을 위해
          <br />
          가입하신 이메일을 입력해주세요.
        </Typography>
        <div css={inputCss}>
          <div style={{ flex: '1' }}>
            <CssTextField
              fullWidth
              // error={!!emailError}
              label="이메일"
              id="custom-css-outlined-input"
              placeholder="abc@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <Button
            css={btnCss}
            color="primary"
            rounded={0.5}
            scale="A200"
            variant="contained"
            handler={isEmailed}
          >
            전송
          </Button>
        </div>
        <FormHelperText error id="component-error-text">
          {emailError}
        </FormHelperText>
        <Button
          css={[btnCss, nextStepBtnCss(step)]}
          style={{ margin: '2rem 0' }}
          fullwidth
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={() => {
            onSubmit();
          }}
        >
          다음으로
        </Button>
      </div>
    </>
  );
};
