/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getGenres } from '../../../../apis/infoApi';
import { container, items } from './styles';
import { IGenreCommon } from '../../../../types/infoTypes';
import { Item } from '../Item';
import { useSearchThemesStore } from '../../../../stores/themeStore';

export const Genre = () => {
  const genreQuery = useSuspenseQuery({
    queryKey: ['genre'],
    queryFn: async () => await getGenres(),
  });

  if (genreQuery.error && !genreQuery.isFetching) {
    throw genreQuery.error;
  }

  const searchThemesStore = useSearchThemesStore();

  const handleFilter = (isAdd: boolean, genreId: number) => {
    const genres = [...searchThemesStore.filters.genreList];
    if (isAdd) {
      genres.push(genreId);
    } else {
      genres.splice(genres.indexOf(genreId), 1);
    }
    const after = { ...searchThemesStore.filters, genreList: [...genres] };
    searchThemesStore.setFilters(after);
  };

  return (
    <div css={container}>
      <div css={items}>
        {genreQuery.data.data.genreList.map((genre: IGenreCommon) => (
          <Item
            key={genre.genreId}
            item={genre.genreName}
            selected={searchThemesStore.filters.genreList.includes(
              genre.genreId,
            )}
            handler={() => {
              handleFilter(
                !searchThemesStore.filters.genreList.includes(genre.genreId),
                genre.genreId,
              );
            }}
          ></Item>
        ))}
      </div>
    </div>
  );
};
