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
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateHashtag, updateUserInfo } from '../../../apis/mypageApi';
import { isNickname } from '../../../apis/authApi';
import { CssTextField } from '../../Signup/AccountInfo';
import { btnCss, inputCss } from '../../Signup/AccountInfo/styles';
import { validateNickname } from '../../../utils/validationUtils';
import { chipItemCss, filterCss } from '../../Signup/ProfileInfo/styles';
import { FilterChip } from '../../../components/FilterChip';
import { getRegions } from '../../../apis/infoApi';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { IRegionCommon, IRegionItem } from '../../../types/infoTypes';
import { useModal } from '../../../hooks/useModal';
import { Selectedtheme } from '../../../modals/mypage/Selectedtheme';

export const EditProfile = () => {
  const nav = useNavigate();
  const [gender, setGender] = useState<'M' | 'F' | undefined>(undefined);
  const [nickname, setNickname] = useState('');
  const [namemsg, setNamemsg] = useState('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const searchThemesStore = useSearchThemesStore();
  const modal = useModal();
  const regionQuery = useQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

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

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(validateNickname(e.target.value));
  };

  // const isNicknamed = async () => {
  //   try {
  //     const response = await isNickname(nickname);
  //     setNamemsg('사용 가능한 닉네임입니다.');
  //     console.log(response);
  //   } catch (err) {
  //     if (nickname.length < 2) {
  //       setNamemsg('2~7자 사이의 한글, 영문, 숫자를 작성해주세요.');
  //     } else {
  //       setNamemsg('중복된 닉네임입니다.');
  //     }
  //     console.log(err);
  //   }
  // };
  const isNicknamed = async () => {
    try {
      await isNickname(nickname);
    } catch (err) {
      console.log(err);
      setNicknameError('이미 존재하는 닉네임입니다.');
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

  const getText = () => {
    let str = '';
    regionQuery.data?.data.regions.forEach((region: IRegionItem) => {
      if (region.regionId === searchThemesStore.filters.region) {
        // 시/도만 선택된 경우
        str += region.regionName;
      } else {
        region.cities.forEach((city: IRegionCommon) => {
          if (city.regionId === searchThemesStore.filters.region) {
            // 시/도와 시/군/구를 모두 연결
            str += `${region.regionName} ${city.regionName}`;
          }
        });
      }
    });
    return str || '선택안함';
  };

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
          <div css={inputCss}>
            <div style={{ flex: '1' }}>
              <CssTextField
                fullWidth
                // error={!!nicknameError}
                label="닉네임"
                id="custom-css-outlined-input"
                placeholder="한글, 영어, 숫자 상관없이 2~7글자"
                value={nickname}
                onChange={handleNicknameChange}
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
          <Typography color="light" size={0.5} weight={400}>
            {namemsg}
          </Typography>
          <div css={filterCss}>
            <FilterChip
              css={chipItemCss}
              color="primary"
              size={1}
              selected={gender === 'M'}
              onHandleClick={() => setGender('M')}
            >
              남성
            </FilterChip>
            <FilterChip
              css={chipItemCss}
              color="primary"
              size={1}
              selected={gender === 'F'}
              onHandleClick={() => setGender('F')}
            >
              여성
            </FilterChip>
          </div>
          <Typography color="light" scale="400" size={1} weight={500}>
            지역(선택)
          </Typography>
          <div css={filterCss}>
            <FilterChip
              css={chipItemCss}
              color="primary"
              size={1}
              selected={getText() !== '선택안함'}
              onHandleClick={() => modal.show(<Selectedtheme />)}
            >
              {getText()}
            </FilterChip>
          </div>
          <Typography color="light" scale="400" size={1} weight={500}>
            선호하는 장르 선택하기
          </Typography>
          <Button rounded={0.5} variant="outlined" handler={() => {}} fullwidth>
            선호하는 장르 수정
          </Button>
          <CssTextField
            fullWidth
            // error={!!nicknameError}
            label="클리어방 수"
            id="custom-css-outlined-input"
            placeholder="클리어한 방 수를 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          />
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
