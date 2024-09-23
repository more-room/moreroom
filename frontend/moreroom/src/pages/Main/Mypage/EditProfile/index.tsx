/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
// import { containerCss, manageInfoContainerCss } from '../styles';
import {
  CakeIcon,
  EnvelopeIcon,
  HashtagIcon,
  KeyIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  profileCss,
  manageInfoContainerCss,
  textFieldCss,
} from '../Profile/styles';
import { Typography } from '../../../../components/Typography';
import { ManageInfo } from '../ManageInfo';
import { Icon } from '../../../../components/Icon';
import { userInfoCss, containerCss } from './styles';
import { Input, TextField, styled } from '@mui/material';
import { Button } from '../../../../components/Button';
import { FilterChip } from '../../../../components/FilterChip';

export const EditProfile = () => {
  const nav = useNavigate();
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
      color: 'var(--text)', // 입력 텍스트 색상
    },
    // Standard variant styles
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white', // 기본 상태의 밑줄 색상
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'white', // 호버 상태의 밑줄 색상
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--primary)', // 포커스 상태의 밑줄 색상
    },
    // Outlined variant styles
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
          <Typography color="grey" scale="500" size={0.75} weight={700}>
            한글, 영어, 숫자 상관없이 2~7글자 이내로 작성해주세요.
          </Typography>
          <div>
            <InputTextField
              css={textFieldCss}
              id="standard-basic"
              label="닉네임"
              variant="standard"
            />
            <Button
              color="primary"
              rounded={0.5}
              scale="A200"
              variant="contained"
              handler={() => {}}
            >
              중복 확인
            </Button>
          </div>
          <Typography color="light" size={1} weight={700}>
            성별
          </Typography>
          <div style={{ display: 'flex' }}>
            <FilterChip color="primary" size={0.875} onHandleClick={() => {}}>
              남성
            </FilterChip>
            <FilterChip color="primary" size={0.875} onHandleClick={() => {}}>
              여성
            </FilterChip>
          </div>
          <Typography color="light" size={1} weight={700}>
            생일
          </Typography>
          <div style={{ display: 'flex' }}>
            <InputTextField
              css={textFieldCss}
              id="outlined-basic"
              label="YYYY"
              variant="outlined"
            />
            <InputTextField
              css={textFieldCss}
              id="outlined-basic"
              label="MM"
              variant="outlined"
            />
            <InputTextField
              css={textFieldCss}
              id="outlined-basic"
              label="DD"
              variant="outlined"
            />
          </div>
          <Typography color="light" size={1} weight={700}>
            지역
          </Typography>
          <div>
            <InputTextField
              css={textFieldCss}
              id="outlined-basic"
              label="시/도"
              variant="outlined"
            />
            <InputTextField
              css={textFieldCss}
              id="outlined-basic"
              label="시/군/구"
              variant="outlined"
            />
          </div>
          <Typography color="light" size={1} weight={700}>
            클리어 방 수
          </Typography>
        </div>
      </div>
    </div>
  );
};
