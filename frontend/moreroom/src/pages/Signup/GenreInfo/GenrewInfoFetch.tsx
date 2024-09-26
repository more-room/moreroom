/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../../../components/Progress';
import { Button } from '../../../components/Button';
import { btnCss } from '../AccountInfo/styles';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getGenres } from '../../../apis/infoApi';
import { IGenreCommon } from '../../../types/infoTypes';
import { FilterChip } from '../../../components/FilterChip';
import { containerCss, itemrCss } from './styles';
import { Typography } from '../../../components/Typography';
import { useSignUpStore } from '../../../stores/signupStore';
import { userSignup } from '../../../apis/authApi';

export const GenreInfoFetch = () => {
  const nav = useNavigate();
  const { genreIdList, setSignUpData } = useSignUpStore();
  const genreQuery = useSuspenseQuery({
    queryKey: ['genre'],
    queryFn: async () => await getGenres(),
  });


  // 장르 선택 상태 관리
  const [selectedGenres, setSelectedGenres] =
    React.useState<number[]>(genreIdList);

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId); // 이미 선택된 장르면 해제
      }
      return [...prev, genreId]; // 선택되지 않은 장르면 추가
    });
  };

  const handleNext = async () => {
    setSignUpData({ genreIdList: selectedGenres });

    const {
      email,
      password,
      passwordCheck,
      nickname,
      gender,
      birth,
      genreIdList,
      regionId,
    } = useSignUpStore.getState();
    console.log('회원가입 데이터:', {
      email,
      password,
      passwordCheck,
      nickname,
      gender,
      birth,
      genreIdList,
      regionId,
    });

    try {
      const res = await userSignup(
        email,
        password,
        passwordCheck,
        nickname,
        gender,
        birth,
        genreIdList,
        regionId,
      );
      console.log(res);
      nav('/signup/done');
    } catch (err) {
      console.log(err);
    }
  };

  if (genreQuery.error && !genreQuery.isFetching) {
    throw genreQuery.error;
  }

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="회원가입"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <Progress color="primary" max={4} size="md" value={3} variant="rounded" />
      <div css={containerCss}>
        <Typography color="light" size={1} weight={700}>
          선호 장르(다중 선택 가능)
        </Typography>
        <div css={itemrCss}>
          {genreQuery.data.data.genreList.map((genre: IGenreCommon) => (
            <FilterChip
              key={genre.genreId}
              color="primary"
              size={0.875}
              onHandleClick={() => handleGenreSelect(genre.genreId)}
              selected={selectedGenres.includes(genre.genreId)} 
            >
              {genre.genreName}
            </FilterChip>
          ))}
        </div>

        <Button
          css={btnCss}
          style={{ margin: '2rem 0' }}
          fullwidth
          color="primary"
          rounded={0.5}
          scale="A200"
          variant="contained"
          handler={handleNext} 
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};
