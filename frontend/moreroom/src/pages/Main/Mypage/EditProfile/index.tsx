/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import {
  profileCss,
  manageInfoContainerCss,
  textFieldCss,
} from '../Profile/styles';
import { Typography } from '../../../../components/Typography';
import { FilterChip } from '../../../../components/FilterChip';
import { Button } from '../../../../components/Button';
import { HashTag } from '../../../../modals/mypage/HashTag';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useHashtagStore } from '../../../../stores/mypageStore';
import { styled, TextField } from '@mui/material';
import { useModal } from '../../../../hooks/useModal';
import { containerCss, nicknameCss } from './styles';

export const EditProfile = () => {
  const nav = useNavigate();
  const [nickname, setNickname] = useState('');
  const { selectedHashtags, toggleHashtag } = useHashtagStore();
  const modal = useModal();

  const handleHashtagClick = (tagId: number) => {
    toggleHashtag(tagId);
    openHashtagModal();
  };

  const openHashtagModal = () => {
    modal.show(<HashTag type="popular" onClose={modal.hide} />);
  };

  const hashtags = [
    { id: 30, label: '리더쉽' },
    { id: 31, label: '쫄보' },
    { id: 32, label: '공포면역' },
    { id: 33, label: '고수예요' },
    { id: 34, label: '초보예요' },
    { id: 35, label: '활동적이에요' },
    { id: 36, label: '눈치가 빨라요' },
    { id: 37, label: '꼼꼼해요' },
    { id: 38, label: '적극적이에요' },
    { id: 39, label: '분석적이에요' },
    { id: 40, label: '스토리를 좋아해요' },
    { id: 41, label: '분위기 메이커' },
  ];

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
          <div css ={nicknameCss}>
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
          <Typography color="light" size={1} weight={700}>
            해시태그
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {selectedHashtags.length > 0 ? (
              hashtags
                .filter((tag) => selectedHashtags.includes(tag.id))
                .map((tag) => (
                  <FilterChip
                    key={tag.id}
                    color="primary"
                    size={0.875}
                    selected
                    onHandleClick={() => handleHashtagClick(tag.id)}
                  >
                    {tag.label}
                  </FilterChip>
                ))
            ) : (
              <Typography color="grey" size={0.875}>
                선택한 해시태그가 없습니다.
              </Typography>
            )}
          </div>
          <Button
            style={{ marginTop: '1rem' }}
            color="primary"
            variant="outlined"
            handler={openHashtagModal}
          >
            해시태그 선택
          </Button>
        </div>
      </div>
    </div>
  );
};
