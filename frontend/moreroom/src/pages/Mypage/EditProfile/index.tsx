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
import { useMutation } from '@tanstack/react-query';
import { updateHashtag, updateUserInfo } from '../../../apis/mypageApi';
import { isNickname } from '../../../apis/authApi';

export const EditProfile = () => {
  const nav = useNavigate();
  const [nickname, setNickname] = useState('');
  const [namemsg, setNamemsg] = useState('');

  const { mutate } = useMutation({
    mutationFn: async ({
      newNickName,
      gender,
      birth,
      newRegionId,
      clearRoom,
    }: {
      newNickName: string;
      gender: string;
      birth: string;
      newRegionId: string;
      clearRoom: number;
    }) =>
      await updateUserInfo(newNickName, gender, birth, newRegionId, clearRoom),
    onSuccess: () => {
      console.log('변경 성공');
      nav('/mypage');
    },
    onError: () => {
      alert('오류가 발생하였습니다.');
    },
  });

  const isNicknamed = async () => {
    try {
      const response = await isNickname(nickname);
      setNamemsg('사용 가능한 닉네임입니다.');
      console.log(response);
    } catch (err) {
      if (nickname.length < 2) {
        setNamemsg('2~7자 사이의 한글, 영문, 숫자를 작성해주세요.');
      } else {
        setNamemsg('중복된 닉네임입니다.');
      }
      console.log(err);
    }
  };

  const edithandler = (
    newNickName: string,
    gender: string,
    birth: string,
    newRegionId: string,
    clearRoom: number,
  ) => {
    mutate({
      newNickName: newNickName,
      gender: gender,
      birth: birth,
      newRegionId: newRegionId,
      clearRoom: clearRoom,
    });
    nav('/mypage');
  };

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
            {/* <InputTextField
              css={textFieldCss}
              id="standard-basic"
              label="닉네임"
              variant="standard"
              value={nickname}
            /> */}
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
              handler={() => isNicknamed()}
            >
              중복 확인
            </Button>
          </div>
          <Typography color="light" size={0.5} weight={400}>
            {namemsg}
          </Typography>
          <Button
            rounded={0.5}
            handler={() => edithandler('D206', 'F', '2000-10-30', '22222', 11)}
            fullwidth
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
};
