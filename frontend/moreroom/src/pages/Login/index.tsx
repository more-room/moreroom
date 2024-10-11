/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import { form, imgCss, container, input, inputbox, err, row } from './styles';
import { Button } from '../../components/Button';
import { UserLogin } from '../../apis/loginApi'; // 로그인 API 호출 함수
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { useMutation } from '@tanstack/react-query';
import { Icon } from '../../components/Icon';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export const Login = React.memo(() => {
  const nav = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [pwdErr, setPwdErr] = useState<boolean>(false);
  const [loginErr, setLoginErr] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: async () =>
      await UserLogin(emailRef.current!.value, pwdRef.current!.value),
    onSuccess: () => {
      if (emailRef.current) emailRef.current.value = '';
      if (pwdRef.current) pwdRef.current.value = '';
      nav('/', { state: { token: true } });
    },
    onError: () => setLoginErr(true),
  });

  const handler = async () => {
    const email = emailRef.current ? emailRef.current.value : '';
    const pwd = pwdRef.current ? pwdRef.current.value : '';

    if (email.length && pwd.length) {
      mutate();
    } else {
      if (!email.length) setEmailErr(true);
      if (!pwd.length) setPwdErr(true);
    }
  };

  return (
    <div css={container}>
      <img src="/logo.png" alt="" css={imgCss} />
      <div css={form}>
        <div style={{ width: '100%' }}>
          <div css={inputbox}>
            <input
              ref={emailRef}
              css={input}
              type="text"
              placeholder="아이디를 입력해주세요"
            />
          </div>
          {emailErr && (
            <Typography size={0.875} color="danger" weight={400} css={err}>
              아이디를 입력해주세요
            </Typography>
          )}
        </div>
        <div style={{ width: '100%' }}>
          <div css={inputbox}>
            <input
              ref={pwdRef}
              css={input}
              type={showPwd ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
            />
            <Icon size={1.25} onClick={() => setShowPwd((prev) => !prev)}>
              {showPwd ? <EyeIcon /> : <EyeSlashIcon />}
            </Icon>
          </div>
          {pwdErr && (
            <Typography size={0.875} color="danger" weight={400} css={err}>
              비밀번호를 입력해주세요
            </Typography>
          )}
        </div>
      </div>
      <div css={form}>
        <Button
          rounded={0.5}
          handler={() => handler()}
          style={{ width: '50%' }}
        >
          <Typography color="light" size={0.875} weight={500}>
            로그인
          </Typography>
        </Button>
        {loginErr && (
          <Typography
            style={{ textAlign: 'center' }}
            color="danger"
            weight={400}
          >
            아이디 또는 비밀번호가 잘못되었습니다
          </Typography>
        )}
      </div>
      <div css={form}>
        <div css={row}>
          <Typography color="light" weight={400} size={0.8125}>
            비밀번호를 잊으셨나요?&nbsp;&nbsp;
          </Typography>
          <Typography
            weight={400}
            size={0.875}
            onClick={() => nav('/auth/find/password')}
          >
            비밀번호 찾기{' '}
          </Typography>
        </div>
        <div css={row}>
          <Typography color="light" weight={400} size={0.8125}>
            아직 계정이 없으신가요?&nbsp;&nbsp;
          </Typography>
          <Typography
            weight={400}
            size={0.875}
            onClick={() => nav('/auth/signup')}
          >
            회원가입{' '}
          </Typography>
        </div>
      </div>
    </div>
  );
});
