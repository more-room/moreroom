/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../../../components/Progress';
import { Typography } from '../../../components/Typography';
import { FilterChip } from '../../../components/FilterChip';
import { chipItemCss, containerCss, filterCss } from './styles';
import { CssTextField } from '../AccountInfo';
import { Button } from '../../../components/Button';
import { btnCss } from '../AccountInfo/styles';
import { useModal } from '../../../hooks/useModal';
import { useSignUpStore } from '../../../stores/signupStore';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { Selectedtheme } from '../../../modals/mypage/Selectedtheme';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '../../../apis/infoApi';
import { IRegionCommon, IRegionItem } from '../../../types/infoTypes';

interface VerificationProps {
  onSubmit: () => void;
}

export const ProfileInfo = ({ onSubmit }: VerificationProps) => {
  const nav = useNavigate();
  const [gender, setGender] = useState<'M' | 'F' | undefined>(undefined);
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const modal = useModal();
  const { setSignUpData } = useSignUpStore();
  const searchThemesStore = useSearchThemesStore();
  const regionQuery = useQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const handleSignUp = () => {
    const birthDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

    setSignUpData({
      gender,
      regionId: searchThemesStore.filters.region,
      birth: birthDate,
    });

    const curdata = useSignUpStore.getState();
    console.log('현재 데이터:', curdata);

    // nav('/signup/genreinfo');
    onSubmit();
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
  </div>;

  return (
    <div>
      <div css={containerCss}>
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
            onChange={(e) => setBirthYear(e.target.value)}
          />
          <CssTextField
            fullWidth
            label="MM"
            id="month-input"
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          />
          <CssTextField
            fullWidth
            label="DD"
            id="day-input"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
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
    </div>
  );
};
