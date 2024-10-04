/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Typography } from '../../../components/Typography';
import { FilterChip } from '../../../components/FilterChip';
import { chipItemCss, containerCss, filterCss } from './styles';
import { Button } from '../../../components/Button';
import { btnCss } from '../AccountInfo/styles';
import { useModal } from '../../../hooks/useModal';
import { useRegionSelectionStore, useSignUpStore } from '../../../stores/signupStore';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { Selectedtheme } from '../../../modals/mypage/Selectedtheme';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '../../../apis/infoApi';
import { IRegionCommon, IRegionItem } from '../../../types/infoTypes';
import { CssTextField } from '../../../components/Mui/CssTextField';

interface VerificationProps { 
  onSubmit: () => void; 
} 

type FormField = 'gender' | 'year' | 'month' | 'day' | 'region'; 
type UserDateValidation = Record<FormField, boolean>; 

export const ProfileInfo = ({ onSubmit }: VerificationProps) => { 
  const [gender, setGender] = useState<'M' | 'F' | undefined>(undefined); 
  const [birthYear, setBirthYear] = useState<string>(''); 
  const [birthMonth, setBirthMonth] = useState<string>(''); 
  const [birthDay, setBirthDay] = useState<string>(''); 
  const modal = useModal(); 
  const [available, setAvailable] = useState<boolean>(false); 
  const [check, setCheck] = useState<UserDateValidation>({ 
      gender: false, 
      year: false, 
      month: false, 
      day: false, 
      region: false, 
  }); 
  const { selectedRegionId, selectedRegion, selectedCity } = useRegionSelectionStore(); 
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
          regionId: selectedRegionId, // 직접 selectedRegionId 사용
          birth: birthDate, 
      }); 

      const curdata = useSignUpStore.getState(); 
      console.log('현재 데이터:', curdata); 
      onSubmit(); 
  }; 

  const getText = () => { 
      return selectedRegion && selectedCity 
          ? `${selectedRegion} ${selectedCity}` 
          : selectedRegion 
          ? selectedRegion 
          : selectedCity 
          ? selectedCity 
          : '선택안함'; // 기본값은 '선택안함' 
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
    setCheck(prevCheck => ({
      ...prevCheck,
      year: true
    }));

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

    setCheck(prevCheck => ({
      ...prevCheck,
      month: true
    }));
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

    setCheck(prevCheck => ({
      ...prevCheck,
      day: true
    }));
  };

  useEffect(() => {
    validate();
  }, [gender, birthYear, birthMonth, birthDay, searchThemesStore.filters.region]);
  
  const validate = (): boolean => {
    if (getText() != '선택안함') {
      setCheck(prevCheck => ({
        ...prevCheck,
        region: true,
      }));
    }
  
    const allTrue = Object.values(check).every((value) => value === true);
  
    if (allTrue) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  
    return allTrue;
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
                  onHandleClick={() => { 
                      setGender('M'); 
                      setCheck((prevCheck) => ({ 
                          ...prevCheck, 
                          gender: true, 
                      })); 
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
                      setCheck((prevCheck) => ({ 
                          ...prevCheck, 
                          gender: true, 
                      })); 
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
                      setCheck(prevCheck => ({ 
                          ...prevCheck, 
                          region: true, 
                      }));
                       
                  }} 
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
              disabled={!available} 
              handler={handleSignUp} 
          > 
              다음으로 
          </Button> 
      </div> 
  </div> 
); 
}; 