/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import {
  profileCss,
  manageInfoContainerCss,
  textFieldCss,
} from '../Profile/styles';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { styled, TextField } from '@mui/material';
import { containerCss, nicknameCss } from './styles';



export const EditProfile = () => {
  const nav = useNavigate();
  const [nickname, setNickname] = useState('');

  const InputTextField = styled(TextField)({
    '& label': {
      color: 'var(--sub-text)',
    },
    '& label.Mui-focused': {
      color: 'var(--primary)',
    },
    '& label.Mui-error': {
      color: '#d32f2f',
    },
    '& .MuiInputBase-input': {
      color: 'white', // 입력 텍스트 색상
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white', // 기본 상태의 밑줄 색상
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'white', // 호버 상태의 밑줄 색상
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white', // 포커스 상태의 밑줄 색상
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // 기본 상태의 테두리 색상
      },
      '&:hover fieldset': {
        borderColor: 'white', // 호버 상태의 테두리 색상
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // 포커스 상태의 테두리 색상
      },
    },
  });

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="프로필 편집"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <div css={containerCss}>
        <UserCircleIcon css={profileCss} />
        <div css={manageInfoContainerCss}>
          <div css={nicknameCss}>
            <InputTextField
              css={textFieldCss}
              id="standard-basic"
              label="닉네임"
              variant="standard"
              value={nickname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNickname(e.target.value)
              }
            />
            <Button
              style={{ marginTop: '0.7rem', marginLeft: '0.5rem' }}
              color="primary"
              rounded={0.5}
              scale="A200"
              variant="contained"
              handler={() => {}}
            >
              중복 확인
            </Button>
          </div>
          <Button rounded={0.5} handler={() => nav(-1)} fullwidth>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
};
