/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useSearchThemesStore,
  useSearchTitleStore,
} from '../../../../../../stores/themeStore';
import { useHistoryWriteStore } from '../../../../../../stores/historyStore';
import { IThemeList, IThemeListItem } from '../../../../../../types/themeTypes';
import { getThemes } from '../../../../../../apis/themeApi';
import { ThemeItem } from '../../../../../../components/ThemeItem';
import { btnCss, checkboxCss, containerCss, listContainer } from './styles';
import { Icon } from '../../../../../../components/Icon';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '../../../../../../components/Button';
import { usePartyStore } from '../../../../../../stores/partyStore';

export const SearchResults = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const searchThemeStore = useSearchThemesStore();
  const searchTitleStore = useSearchTitleStore();
  const historyWriteStore = useHistoryWriteStore();
  const partyStore = usePartyStore();
  const divRef = useRef<HTMLDivElement | null>(null);

  // 선택한 테마 상태 관리
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);

  const [themeQuery, setThemeQuery] = useState<IThemeList>({
    pageNumber: 0,
    content: { themeList: [] },
  });

  const fetchMoreThemes = () => {
    const nextPage = themeQuery.pageNumber + 1;
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

  // 이미 선택된 테마를 클릭하면 선택 해제, 새로 클릭하면 선택
  const handleCheckboxClick = (theme: IThemeListItem) => {
    console.log(theme.themeId);
    partyStore.setPartyData({
      themeId: theme.themeId,
      themeTitle: theme.title,
      poster: theme.poster,
      brandName: theme.cafe.brandName,
      branchName: theme.cafe.branchName,
    });
    setSelectedThemeId((prev) =>
      prev === theme.themeId ? null : theme.themeId,
    );
  };

  const handleConfirm = () => {
    if (selectedThemeId) {
      console.log('선택된 테마: ', selectedThemeId);

      nav('/party/register');
    } else {
      console.log('선택된 테마가 없습니다.');
    }
  };
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
      {themeQuery?.content?.themeList.map((theme: IThemeListItem) => (
        <div key={theme.themeId} css={containerCss}>
          <ThemeItem
            theme={theme}
            pattern={searchTitleStore.title}
            onClick={() => handleClick(theme)}
          />
          <div
            css={checkboxCss(selectedThemeId === theme.themeId)} 
            onClick={() => handleCheckboxClick(theme)}
          >
            <Icon
              color={selectedThemeId === theme.themeId ? 'primary' : 'grey'}
              size={2}
            >
              <CheckIcon />
            </Icon>
          </div>
        </div>
      ))}
      <div css={btnCss}>
        <Button
          color="primary"
          fullwidth
          rounded={0.5}
          variant="contained"
          handler={handleConfirm}
        >
          확인
        </Button>
      </div>
    </div>
  );
};
