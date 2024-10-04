/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Typography } from '../../../components/Typography';
import { FilterChip } from '../../../components/FilterChip';
import { chipItemCss, containerCss, filterCss } from './styles';
import { Button } from '../../../components/Button';
import { btnCss } from '../AccountInfo/styles';
import { useModal } from '../../../hooks/useModal';
import {
  useRegionSelectionStore,
  useSignUpStore,
} from '../../../stores/signupStore';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { Selectedtheme } from '../../../modals/mypage/Selectedtheme';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '../../../apis/infoApi';
import { CssTextField } from '../../../components/Mui/CssTextField';

interface VerificationProps {
  before: () => void;
  onSubmit: () => void;
}
export const ProfileInfo = ({ before, onSubmit }: VerificationProps) => {
  const signUpStore = useSignUpStore();
  const [gender, setGender] = useState<'M' | 'F' | undefined>(signUpStore.gender);
  const birth = signUpStore.birth.split('-');
  const [birthYear, setBirthYear] = useState<string>(birth[0]);
  const [birthMonth, setBirthMonth] = useState<string>(birth[1]);
  const [birthDay, setBirthDay] = useState<string>(birth[2]);
  const modal = useModal();
  const [available, setAvailable] = useState<boolean>(false);

  const { selectedRegionId, selectedRegion, selectedCity } =
    useRegionSelectionStore();

  const regionQuery = useQuery({
    queryKey: ['region'],
    queryFn: async () => await getRegions(),
  });

  const handleSignUp = () => {
    const birthDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

    signUpStore.setSignUpData({
      gender,
      regionId: selectedRegionId, // 직접 selectedRegionId 사용
      birth: birthDate,
    });

    const curdata = useSignUpStore.getState();
    console.log('현재 데이터:', curdata);
    onSubmit();
  };

  const getText = () => {
    const regionText = selectedRegion && selectedCity
      ? `${selectedRegion} ${selectedCity}`
      : selectedRegion
      ? selectedRegion
      : selectedCity
      ? selectedCity
      : '선택안함';
    return regionText;
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let onlyNumber = value.replace(/[^0-9]/g, '');

    if (onlyNumber.length > 4) {
      onlyNumber = onlyNumber.slice(0, 4);
    }

    // 4자리 입력 후 범위 체크
    if (onlyNumber.length === 4) {
      const year = parseInt(onlyNumber, 10);
      if (year < 1924) {
        setBirthYear('1924'); 
      } else if (year > 2024) {
        setBirthYear('2024');
      } else {
        setBirthYear(onlyNumber); // 유효한 연도는 그대로 설정
      }
    } else {
      setBirthYear(onlyNumber); // 4자리 미만일 때는 그대로 입력
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const onlyNumber = value.replace(/[^0-9]/g, '');
    const month = parseInt(onlyNumber, 10);

    if (onlyNumber.length <= 2) {
      setBirthMonth(onlyNumber);
    }

    // 1~12 범위 제한
    if (onlyNumber.length === 2) {
      if (month < 1) {
        setBirthMonth('01'); 
      } else if (month > 12) {
        setBirthMonth('12');
      } else {
        setBirthMonth(onlyNumber); 
      }
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    const day = parseInt(onlyNumber, 10);
    if (onlyNumber.length <= 2) {
      setBirthDay(onlyNumber);
    }
    if (onlyNumber.length === 2) {
      if (day < 1) {
        setBirthDay('01');
      } else if (day > 31) {
        setBirthDay('31');
      } else {
        setBirthDay(onlyNumber); 
      }
    }
  };

  useEffect(() => {
    validate();
  }, [
    gender,
    birthYear,
    birthMonth,
    birthDay,
    getText()
  ]);

  const validate = (): boolean => {
    const isGenderSelected = gender !== undefined;
    console.log("성별 선택됨:", isGenderSelected);
    
    const isRegionSelected = getText() !== '선택안함';
    console.log("지역 선택됨:", isRegionSelected);

    const isBirthValid =
      birthYear?.length === 4 && birthMonth?.length === 2 && birthDay?.length === 2;
    console.log("생년월일 유효:", isBirthValid);
  
    const allFieldsValid = isGenderSelected && isRegionSelected && isBirthValid;
    setAvailable(allFieldsValid);
    
    return allFieldsValid;
  };
  

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
            onHandleClick={() => {
              setGender('M');
            }}
          >
            남성
          </FilterChip>
          <FilterChip
            css={chipItemCss}
            color="primary"
            size={1}
            selected={gender === 'F'}
            onHandleClick={() => {
              setGender('F');
            }}
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
            onHandleClick={() => {
              modal.show(<Selectedtheme />);
            }}
          >
            {getText()}
          </FilterChip>
        </div>
        <Button
          css={btnCss}
          style={{ margin: '2rem 0', justifyContent: 'flex-start' }}
          color="primary"
          rounded={0.5}
          variant="contained"
          handler={() => before()}
        >
          이전
        </Button>
        <Button
          css={btnCss}
          style={{ margin: '2rem 0', float: 'right' }}
          color="primary"
          rounded={0.5}
          variant="contained"
          disabled={!available}
          handler={handleSignUp}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
