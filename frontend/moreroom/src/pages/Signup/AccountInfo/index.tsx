/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TextField, styled } from '@mui/material';
import { Button } from '../../../components/Button';
import { btnCss, inputCss, containerCss } from './styles';
import { useNavigate } from 'react-router-dom';
import {
  isEmail,
  isNickname,
  sendEmail,
  verifyCode,
} from '../../../apis/authApi';
import { useSignUpStore } from '../../../stores/signupStore';

export const CssTextField = styled(TextField)({
  '& label': {
    color: '#fff',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
});

export const AccountInfo = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const {setSignUpData} = useSignUpStore();


  const handleSignUp = () => {
    console.log('이건 뜨지롱');
    // 회원가입 요청을 보내기 전에 store에 저장된 모든 정보를 사용
    setSignUpData({ email, password, passwordCheck: checkPassword, nickname });
  
    // 현재 스토어에 저장된 데이터를 가져옴
    const curdata = useSignUpStore.getState();
    console.log('현재 데이터:', curdata);
  
    // 다음 페이지로 이동
    nav('/signup/profileinfo');
  };
  const isEmailed = async () => {
    try {
      const response = await isEmail(email);
      console.log(response);
      if (response.data.duplicated === 'False') {
        console.log('없는 메일이넴');
        sendNumber();
      } else {
        console.log('이미 있음');
      }
    } catch (err) {
      console.log('이미 있넴 ㅎ');
    }
  };

  const sendNumber = async () => {
    try {
      const res = await sendEmail(email);
      console.log(res);
    } catch (err) {
      console.log('이번에 또 에러', err);
    }
  };

  // const handleCode = useMutation({
  //   mutationFn: () => verifyCode(email, code),
  //   onError: () => console.log(email, code),
  // });
  const hadleCode = async () => {
    try {
      const res = await verifyCode(email, code);
      console.log(res);
    } catch (err) {
      console.log(email, code, err);
    }
  };

  const isNicknamed = async () => {
    try {
      const res = await isNickname(nickname);
      console.log(res);
    } catch (err) {
      console.log('이번에 또 에러가 났는데 ㅅ', err);
    }
  };

  return (
    <div css={containerCss}>
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            label="이메일"
            id="custom-css-outlined-input"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
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
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            label="인증번호"
            id="custom-css-outlined-input"
            placeholder="XXXXXX"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <Button
          css={btnCss}
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={hadleCode}
        >
          확인
        </Button>
      </div>
      <div css={inputCss}>
        <CssTextField
          fullWidth
          label="비밀번호"
          id="custom-css-outlined-input"
          placeholder="영문, 숫자 포함 8글자 이상"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div css={inputCss}>
        <CssTextField
          fullWidth
          label="비밀번호 확인"
          id="custom-css-outlined-input"
          placeholder="영문, 숫자 포함 8글자 이상"
          value={checkPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCheckPassword(e.target.value);
          }}
        />
      </div>
      <div css={inputCss}>
        <div style={{ flex: '1' }}>
          <CssTextField
            fullWidth
            label="닉네임"
            id="custom-css-outlined-input"
            placeholder="한글, 영어, 숫자 상관없이 2~7글자"
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNickname(e.target.value);
            }}
          />
        </div>
        <Button
          css={btnCss}
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={isNicknamed}
        >
          확인
        </Button>
      </div>
      <Button
        css={btnCss}
        style={{ margin: '2rem 0' }}
        fullwidth
        color="primary"
        rounded={0.5}
        scale="A200"
        variant="contained"
        handler={handleSignUp}
      >
        다음으로
      </Button>
    </div>
  );
};
