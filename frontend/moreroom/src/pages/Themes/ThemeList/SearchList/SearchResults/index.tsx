/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { getThemes } from '../../../../../apis/themeApi';
import {
  useSearchThemesStore,
  useSearchTitleStore,
} from '../../../../../stores/themeStore';
import { IThemeList, IThemeListItem } from '../../../../../types/themeTypes';
import { ThemeItem } from '../../../../../components/ThemeItem';
import { listContainer } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHistoryWriteStore } from '../../../../../stores/historyStore';

export const SearchResults = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const searchThemeStore = useSearchThemesStore();
  const searchTitleStore = useSearchTitleStore();
  const historyWriteStore = useHistoryWriteStore();
  const divRef = useRef<HTMLDivElement>(null);
  const themeQueryRef = useRef<IThemeList | null>(null);
  const [themeQuery, setThemeQuery] = useState<IThemeList>({
    pageNumber: 0,
    content: { themeList: [] },
  });

  const fetchMoreThemes = () => {
    const nextPage = themeQueryRef.current?.pageNumber! + 1;
    const updatedFilters = {
      ...searchThemeStore.filters,
      pageNumber: nextPage,
    };

    getThemes(updatedFilters)
      .then((res) => {
        setThemeQuery((prev) => {
          const pre = { ...prev };
          res.data.content?.themeList.forEach((v: IThemeListItem) => {
            pre.content?.themeList.push(v);
          });
          return pre;
        });
      })
      .catch((err) => console.log(err));
  };

  const handleScroll = () => {
    if (divRef.current) {
      const scrollTop = divRef.current.scrollTop;
      const scrollHeight = divRef.current.scrollHeight;
      const clientHeight = divRef.current.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 0.5) {
        fetchMoreThemes();
      }
    }
  };

  const handleClick = (theme: IThemeListItem) => {
    if (loc.pathname.split('/').includes('history')) {
      historyWriteStore.setThemeId(theme.themeId);
      nav('/history/write');
    } else {
      nav('/theme/detail', { state: { themeId: theme.themeId } });
    }
  };

  useEffect(() => {
    themeQueryRef.current = themeQuery;
  }, [themeQuery]);

  useEffect(() => {
    getThemes(searchThemeStore.filters)
      .then((res) => {
        setThemeQuery(res.data);
      })
      .catch((err) => console.log(err));

    if (divRef.current) divRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (divRef.current)
        divRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const after = { ...searchThemeStore.filters, pageNumber: 0 };
    searchThemeStore.setFilters(after);

    getThemes(searchThemeStore.filters)
      .then((res) => {
        setThemeQuery(res.data);
      })
      .catch((err) => console.log(err));
  }, [
    searchThemeStore.filters.brandId,
    searchThemeStore.filters.genreList,
    searchThemeStore.filters.level,
    searchThemeStore.filters.people,
    searchThemeStore.filters.playtime,
    searchThemeStore.filters.price,
    searchThemeStore.filters.region,
    searchThemeStore.filters.title,
  ]);

  return (
    <div ref={divRef} css={listContainer}>
      {themeQuery?.content?.themeList.map(
        (theme: IThemeListItem, idx: number) => (
          <ThemeItem
            key={idx}
            theme={theme}
            pattern={searchTitleStore.title}
            onClick={() => handleClick(theme)}
          />
        ),
      )}
    </div>
  );
};
