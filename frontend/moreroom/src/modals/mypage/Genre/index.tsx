/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { container, items } from './styles';
import { getGenres } from '../../../apis/infoApi';
import { Item } from '../../theme/ThemeFilters/Item';
import { IGenreCommon } from '../../../types/infoTypes';
import { useSignUpStore } from '../../../stores/signupStore';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { getMypage } from '../../../apis/mypageApi';
import { useGenreSelectionStore } from '../../../stores/mypageStore';

export const Genre = () => {
  const [genreQuery, ProfileQuery] = useQueries({
    queries: [
      { queryKey: ['genre'], queryFn: async () => await getGenres() },
      { queryKey: ['profile'], queryFn: async () => await getMypage() },
    ],
  });

  const { genreIdList, setSignUpData } = useSignUpStore();
  const { 
    selectedGenreIds, 
    setSelectedGenre, 
    removeSelectedGenre, 
    resetSelection 
  } = useGenreSelectionStore();

  useEffect(() => {
    if (ProfileQuery.data?.data?.genreList) {
      const initialSelectedGenres = ProfileQuery.data.data.genreList.map((genre: string) => {
        const foundGenre = genreQuery.data?.data.genreList.find((g: IGenreCommon) => g.genreName === genre);
        return foundGenre ? foundGenre.genreId : null;
      }).filter(Boolean) as number[];

      resetSelection();
      initialSelectedGenres.forEach((genreId) => {
        const genre = genreQuery.data?.data.genreList.find((g: IGenreCommon) => g.genreId === genreId);
        if (genre) {
          setSelectedGenre(genreId, genre.genreName);
        }
      });
    }
  }, [ProfileQuery.data, genreQuery.data, resetSelection, setSelectedGenre]);

  const handleGenreSelect = (genreId: number, genreName: string) => {
    if (selectedGenreIds.includes(genreId)) {
      removeSelectedGenre(genreId);
    } else {
      setSelectedGenre(genreId, genreName);
    }
  };

  useEffect(() => {
    setSignUpData({ genreIdList: selectedGenreIds });
  }, [selectedGenreIds, setSignUpData]);

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
            selected={selectedGenreIds.includes(genre.genreId)}
            handler={() => handleGenreSelect(genre.genreId, genre.genreName)}
          />
        ))}
      </div>
    </div>
  );
};