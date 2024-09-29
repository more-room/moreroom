/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { FormHelperText, styled, TextField } from '@mui/material';
import {
  chipItemCss,
  containerCss,
  contentCss,
  nicknameCss,
  filterCss,
} from './styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getMyInfo,
  updateHashtag,
  updateUserInfo,
} from '../../../../apis/mypageApi';
import { isNickname } from '../../../../apis/authApi';
import { CssTextField } from '../../../Signup/AccountInfo';
import { btnCss, inputCss } from '../../../Signup/AccountInfo/styles';
import { validateNickname } from '../../../../utils/validationUtils';
import { FilterChip } from '../../../../components/FilterChip';
import { getRegions } from '../../../../apis/infoApi';
import { useSearchThemesStore } from '../../../../stores/themeStore';
import { IRegionCommon, IRegionItem } from '../../../../types/infoTypes';
import { useModal } from '../../../../hooks/useModal';
import { Selectedtheme } from '../../../../modals/mypage/Selectedtheme';
import { SelectedGenre } from '../../../../modals/mypage/SelectedGenre';

export const EditProfile = () => {
  const nav = useNavigate();
  const [gender, setGender] = useState<'M' | 'F' | undefined>(undefined);
  const [nickname, setNickname] = useState('');
  const [namemsg, setNamemsg] = useState('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const searchThemesStore = useSearchThemesStore();
  const modal = useModal();
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');

  const regionQuery = useQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const MyInfoQuery = useQuery({
    queryKey: ['myinfo'],
    queryFn: async () => await getMyInfo(),
  });
  const [room, setRoom] = useState<string>(
    MyInfoQuery?.data?.data.clearRoom || '',
  );
  const { mutate } = useMutation({
    mutationFn: async ({
      newNickName,
      gender,
      birth,
      newRegionId,
      clearRoom,
      genreIdList,
    }: {
      newNickName: string;
      gender: 'M' | 'F'; // 성별은 'M' 또는 'F'만 가능하도록 타입 정의
      birth: string;
      newRegionId: string; // newRegionId의 타입을 string으로 설정
      clearRoom: number;
      genreIdList: number[]; // genreIdList는 number[]로 설정
    }) =>
      await updateUserInfo(
        newNickName,
        gender,
        birth,
        genreIdList,
        newRegionId,
        clearRoom,
      ),
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
  const handleEdit = async () => {
    // 생년월일을 YYYY-MM-DD 형식으로 변환
    const birth = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

    // 지역 ID를 가져오기
    const newRegionId = searchThemesStore.filters.region || ''; // 기본값을 빈 문자열로 설정

    // 장르 ID 리스트를 가져오기
    const genreIdList = searchThemesStore.filters.genreList || []; // 장르가 없을 경우 빈 배열로 설정

    if (gender) {
      // gender가 정의된 경우에만 mutate 호출
      mutate({
        newNickName: nickname,
        gender: gender,
        birth: birth,
        newRegionId: newRegionId,
        clearRoom: parseInt(room) || 0, // 방 수는 숫자로 변환
        genreIdList: genreIdList,
      });
    } else {
      alert('성별을 선택해 주세요.');
    }
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

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 숫자만 허용
    const onlyNumber = value.replace(/[^0-9]/g, '');

    // 4자리 이상 입력 후 범위 체크
    if (onlyNumber.length === 4) {
      const year = parseInt(onlyNumber, 10);
      if (year < 1924) {
        setBirthYear('1924'); // 1924년으로 설정
      } else if (year > 2024) {
        setBirthYear('2024'); // 2024년으로 설정
      } else {
        setBirthYear(onlyNumber); // 유효한 연도는 그대로 설정
      }
    } else {
      setBirthYear(onlyNumber); // 4자리 미만일 때는 그대로 입력
    }
  };
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 숫자만 허용
    const onlyNumber = value.replace(/[^0-9]/g, '');
    const month = parseInt(onlyNumber, 10);

    // 2자리 미만일 때는 그대로 입력
    if (onlyNumber.length <= 2) {
      setBirthMonth(onlyNumber);
    }

    // 1~12 범위 제한
    if (onlyNumber.length === 2) {
      if (month < 1) {
        setBirthMonth('01'); // 01로 설정
      } else if (month > 12) {
        setBirthMonth('12'); // 12로 설정
      } else {
        setBirthMonth(onlyNumber); // 유효한 월은 그대로 설정
      }
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 숫자만 허용
    const onlyNumber = value.replace(/[^0-9]/g, '');
    const day = parseInt(onlyNumber, 10);

    // 2자리 미만일 때는 그대로 입력
    if (onlyNumber.length <= 2) {
      setBirthDay(onlyNumber);
    }

    // 1~31 범위 제한
    if (onlyNumber.length === 2) {
      if (day < 1) {
        setBirthDay('01'); // 01로 설정
      } else if (day > 31) {
        setBirthDay('31'); // 31로 설정
      } else {
        setBirthDay(onlyNumber); // 유효한 일은 그대로 설정
      }
    }
  };

  const handleroom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 숫자만 허용
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setRoom(onlyNumber); // 수정된 값으로 상태 업데이트
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
        {/* <UserCircleIcon css={profileCss} /> */}
        <div css={contentCss}>
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
          <FormHelperText error id="component-error-text">
            {nicknameError}
          </FormHelperText>
          <Typography color="light" scale="400" size={1} weight={500}>
            성별
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
            생년월일
          </Typography>
          <div css={filterCss}>
            <CssTextField
              fullWidth
              label="YYYY"
              id="year-input"
              value={birthYear}
              onChange={handleYearChange}
            />
            <CssTextField
              fullWidth
              label="MM"
              id="month-input"
              value={birthMonth}
              onChange={handleMonthChange}
            />
            <CssTextField
              fullWidth
              label="DD"
              id="day-input"
              value={birthDay}
              onChange={handleDayChange}
            />
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
          <div css={filterCss}>
            <Button
              style={{ padding: '0.8rem' }}
              rounded={0.5}
              fullwidth
              variant="outlined"
              handler={() => modal.show(<SelectedGenre />)}
            >
              선호하는 장르 수정
            </Button>
          </div>
          <Typography color="light" scale="400" size={1} weight={500}>
            클리어 방 수
          </Typography>
          <div css={filterCss}>
            <div style={{ flex: '1' }}>
              <CssTextField
                fullWidth
                // error={!!nicknameError}
                label="클리어 방 수"
                id="custom-css-outlined-input"
                value={room}
                onChange={handleroom}
              />
            </div>
          </div>
          <Button rounded={0.5} handler={handleEdit} fullwidth>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
};
