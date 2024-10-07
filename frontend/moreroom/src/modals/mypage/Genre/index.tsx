/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useQueries, useSuspenseQuery } from '@tanstack/react-query';
import { container, items } from './styles';
import { getGenres } from '../../../apis/infoApi';
import { Item } from '../../theme/ThemeFilters/Item';
import { IGenreCommon } from '../../../types/infoTypes';
import { useSignUpStore } from '../../../stores/signupStore'; // 회원가입 스토어
import { useSearchThemesStore } from '../../../stores/themeStore'; // 테마 스토어
import { getMypage } from '../../../apis/mypageApi';

export const Genre = () => {

  const [genreQuery, ProfileQuery] = useQueries({
    queries: [
      { queryKey: ['genre'], queryFn: async () => await getGenres() },
      { queryKey: ['profile'], queryFn: async () => await getMypage() },
    ],
  });

    // 회원가입 스토어에서 genreIdList를 가져옴
  const { genreIdList, setSignUpData } = useSignUpStore();

  // 선택된 장르를 저장할 상태
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  // ProfileQuery의 장르 목록으로 초기화
  useEffect(() => {
    if (ProfileQuery.data?.data?.genreList) {
      const initialSelectedGenres = ProfileQuery.data.data.genreList.map((genre: string) => {
        // 각 장르 이름에 해당하는 ID를 찾아서 배열에 추가
        const foundGenre = genreQuery.data?.data.genreList.find((g: IGenreCommon) => g.genreName === genre);
        return foundGenre ? foundGenre.genreId : null;
      }).filter(Boolean) as number[]; // null 값을 제거하고 number[]로 변환

      setSelectedGenres(initialSelectedGenres);
    }
  }, [ProfileQuery.data, genreQuery.data]);

  // 사용자가 장르를 선택할 때 호출되는 함수
  const handleGenreSelect = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      // 이미 선택된 경우 제거
      const updatedGenres = selectedGenres.filter((id) => id !== genreId);
      setSelectedGenres(updatedGenres);
    } else {
      // 선택되지 않은 경우 추가
      const updatedGenres = [...selectedGenres, genreId];
      setSelectedGenres(updatedGenres);
    }
  };

  // 선택된 장르를 회원가입 스토어에 저장
  useEffect(() => {
    setSignUpData({ genreIdList: selectedGenres });
  }, [selectedGenres, setSignUpData]);

  if (genreQuery.error && !genreQuery.isFetching) {
    throw genreQuery.error;
  }

  return (
    <div css={container}>
      <div css={items}>
        {genreQuery.data?.data.genreList.map((genre: IGenreCommon) => (
          <Item
            key={genre.genreId}
            item={genre.genreName}
            // 선택된 장르 표시 (selected 상태)
            selected={selectedGenres.includes(genre.genreId)}
            handler={() => handleGenreSelect(genre.genreId)}
          />
        ))}
      </div>
    </div>
  );
};
