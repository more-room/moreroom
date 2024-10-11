/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../../../../components/Typography';
import { Button } from '../../../../components/Button';
import { FormHelperText } from '@mui/material';
import { chipItemCss, containerCss, contentCss, filterCss } from './styles';
import { useMutation, useQueries } from '@tanstack/react-query';
import {
  getMyInfo,
  getMypage,
  updateUserInfo,
} from '../../../../apis/mypageApi';
import { isNickname } from '../../../../apis/authApi';
import { btnCss, inputCss } from '../../../Signup/AccountInfo/styles';
import { validateNickname } from '../../../../utils/validationUtils';
import { FilterChip } from '../../../../components/FilterChip';
import { getRegions } from '../../../../apis/infoApi';
import { useSearchThemesStore } from '../../../../stores/themeStore';
import { IRegionItem } from '../../../../types/infoTypes';
import { useModal } from '../../../../hooks/useModal';
import { Selectedtheme } from '../../../../modals/mypage/Selectedtheme';
import { SelectedGenre } from '../../../../modals/mypage/SelectedGenre';
import { CssTextField } from '../../../../components/Mui/CssTextField';
import { useRegionSelectionStore } from '../../../../stores/signupStore';
import { handleDateChange } from '../../../../utils/birthUtils';
import { Notification } from '../../../../components/Notification';
import { useGenreSelectionStore } from '../../../../stores/mypageStore';

export const EditProfile = () => {
  const nav = useNavigate();
  const [nicknameError, setNicknameError] = useState<string>('');
  const searchThemesStore = useSearchThemesStore();
  const modal = useModal();
  const [showmodal, setshowmodal] = useState<boolean>(false);

  const regionStore = useRegionSelectionStore();
  const genreStore = useGenreSelectionStore();
  const [regionQuery, MyInfoQuery, ProfileQuery] = useQueries({
    queries: [
      { queryKey: ['region'], queryFn: async () => await getRegions() },
      { queryKey: ['myinfo'], queryFn: async () => await getMyInfo() },
      { queryKey: ['profile'], queryFn: async () => await getMypage() },
    ],
  });

  const [nickname, setNickname] = useState<string>(
    MyInfoQuery.data?.data?.nickname,
  );
  const [gender, setGender] = useState<'M' | 'F' | undefined>(
    MyInfoQuery.data?.data.gender,
  );

  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');

  const [room, setRoom] = useState<string>(
    MyInfoQuery?.data?.data?.clearRoom || '',
  );

  useEffect(() => {
    if (MyInfoQuery.isSuccess && MyInfoQuery.data && MyInfoQuery.data.data) {
      const { nickname, gender, birth, clearRoom, regionId } =
        MyInfoQuery.data.data;

      setNickname(nickname || '');
      setGender(gender || undefined);

      // 생년월일이 존재하는지 확인하고 분리
      if (birth && typeof birth === 'string') {
        const birthArr = birth.split('-');
        if (birthArr.length === 3) {
          setBirthYear(birthArr[0] || '');
          setBirthMonth(birthArr[1] || '');
          setBirthDay(birthArr[2] || '');
        }
      }

      // 클리어 방 수 설정
      setRoom(clearRoom ? String(clearRoom) : '');

      // 지역 설정 (regionId가 있을 경우)
      if (regionId && regionQuery.isSuccess) {
        // 지역 API 데이터에서 regionId와 일치하는 지역 찾기
        const selectedRegionData = regionQuery.data.data.regions.find(
          (region: IRegionItem) => region.regionId === regionId,
        );

        // 선택된 지역이 존재하면, 스토어에 지역과 도시 설정
        if (selectedRegionData) {
          regionStore.setSelectedRegion(selectedRegionData.regionName);
          regionStore.setSelectedRegionId(regionId);

          // 만약 하위 도시 정보도 있으면 설정
          if (
            selectedRegionData.cities &&
            selectedRegionData.cities.length > 0
          ) {
            regionStore.setSelectedCity(
              selectedRegionData.cities[0].regionName,
            ); // 첫 번째 도시를 기본값으로 설정
          } else {
            regionStore.setSelectedCity(null); // 도시가 없을 경우 초기화
          }
        }
      }
    }
  }, [MyInfoQuery.isSuccess, MyInfoQuery.data, regionQuery.isSuccess]);

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
      gender: 'M' | 'F';
      birth: string;
      newRegionId: string;
      clearRoom: number;
      genreIdList: number[];
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
      nav('/', { state: { menu: 4 } });
    },
    onError: () => {
      alert('오류가 발생하였습니다.');
    },
  });

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(validateNickname(e.target.value));
    setIsNicknameVerified(false);
  };

  const isNicknamed = async () => {
    try {
      await isNickname(nickname);
      setIsNicknameVerified(true);
    } catch (err) {
      console.log(err);
      setNicknameError('이미 존재하는 닉네임입니다.');
      setIsNicknameVerified(false);
    }
  };
  const [isNicknameVerified, setIsNicknameVerified] = useState(true);
  const handleEdit = async () => {
    // 만약 닉네임 중복확인 안하고 수정하면 뜨는 공지
    if (!isNicknameVerified) {
      setshowmodal(true);
      return;
    }

    // 생년월일을 YYYY-MM-DD 형식으로 변환
    const birth = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

    // 지역 ID를 가져오기
    const newRegionId = regionStore.selectedRegionId || ''; // 기본값을 빈 문자열로 설정

    // 장르 ID 리스트를 가져오기
    const genreIdList = genreStore.selectedGenreIds || []; // 장르가 없을 경우 빈 배열로 설정

    if (gender) {
      // gender가 정의된 경우에만 mutate 호출
      mutate({
        newNickName: nickname,
        gender: gender,
        birth: birth,
        newRegionId: newRegionId,
        clearRoom: parseInt(room) || 0,
        genreIdList: genreIdList,
      });
    } else {
      alert('성별을 선택해 주세요.');
      console.log(
        '보낸 데이터',
        nickname,
        gender,
        birth,
        newRegionId,
        room,
        genreIdList,
      );
    }
  };

  const getSelectedGenresText = () => {
    const selectedGenres = genreStore.selectedGenreNames;

    if (selectedGenres.length > 0) {
      if (selectedGenres.length > 4) {
        return `장르 ${selectedGenres.length}개`;
      } else {
        return selectedGenres.join(', ');
      }
    } else {
      return '선택안함';
    }
  };
  const getText = () => {
    const selectedRegion = regionStore.selectedRegion;
    const selectedCity = regionStore.selectedCity;

    return selectedRegion && selectedCity
      ? `${selectedRegion} ${selectedCity}`
      : selectedRegion
        ? selectedRegion
        : selectedCity
          ? selectedCity
          : '선택안함'; // 기본 값
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleDateChange(value, 'year', setBirthYear);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleDateChange(value, 'month', setBirthMonth);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleDateChange(value, 'day', setBirthDay);
  };

  const handleroom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setRoom(onlyNumber);
  };

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="프로필 편집"
          backHandler={() => nav('/', { state: { menu: 4 } })}
        />
      </TopBar>
      <div css={containerCss}>
        {showmodal ? (
          <Notification
            handler={() => setshowmodal(false)}
            ment="닉네임을 변경하려면 중복 확인을 해주세요!"
            type="alert"
          />
        ) : undefined}
        <div css={contentCss}>
          <div css={inputCss}>
            <div style={{ flex: '1' }}>
              <CssTextField
                fullWidth
                error={!!nicknameError}
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
          <div css={filterCss}>
            <div style={{ flex: '1' }}>
              <CssTextField
                fullWidth
                label="클리어 방 수"
                id="custom-css-outlined-input"
                value={room}
                onChange={handleroom}
              />
            </div>
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
            지역
          </Typography>
          <div css={filterCss}>
            <FilterChip
              css={chipItemCss}
              color="primary"
              size={1}
              selected={getText() !== '선택안함'}
              onHandleClick={() =>
                modal.show(
                  <Selectedtheme regionId={MyInfoQuery.data?.data?.regionId} />,
                )
              }
            >
              {getText()}
            </FilterChip>
          </div>
          <Typography color="light" scale="400" size={1} weight={500}>
            선호하는 장르
          </Typography>
          <div css={filterCss}>
            <FilterChip
              css={chipItemCss}
              size={1}
              selected={getSelectedGenresText() !== '선택안함'}
              onHandleClick={() => modal.show(<SelectedGenre />)}
            >
              {getSelectedGenresText()}
            </FilterChip>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '2rem',
              gap: '0.5rem',
            }}
          >
            <Button
              color="danger"
              rounded={0.5}
              handler={() => nav('/', { state: { menu: 4 } })}
            >
              취소
            </Button>
            <Button rounded={0.5} handler={handleEdit}>
              수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
