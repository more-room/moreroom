/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { btnCss, checkboxCss, containerCss, listContainer } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import {
  useSearchThemesStore,
  useSearchTitleStore,
} from '../../../../../../stores/themeStore';
import { useHistoryWriteStore } from '../../../../../../stores/historyStore';
import { getThemes } from '../../../../../../apis/themeApi';
import { IThemeListItem } from '../../../../../../types/themeTypes';
import { ThemeItem } from '../../../../../../components/ThemeItem';
import { Icon } from '../../../../../../components/Icon';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '../../../../../../components/Button';
import { usePartyStore } from '../../../../../../stores/partyStore';

interface ISelected {
  currentPartyRequestId?: number
}

export const SearchResults = ({currentPartyRequestId}:ISelected) => {
  const loc = useLocation();
  const nav = useNavigate();
  const searchThemeStore = useSearchThemesStore();
  const searchTitleStore = useSearchTitleStore();
  const historyWriteStore = useHistoryWriteStore();
  const queryClient = useQueryClient();
  const partyStore = usePartyStore();
  const divRef = useRef<HTMLDivElement>(null);

  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
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
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['themes'],
    queryFn: async ({ pageParam }) => {
      const response = await getThemes(searchThemeStore.filters, pageParam);
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageNumber === lastPage.totalPage
        ? undefined
        : lastPage.pageNumber + 1,
  });
  const handleConfirm = () => {
    if (selectedThemeId) {
      console.log('선택된 테마: ', selectedThemeId);
      console.log('현재 번호',currentPartyRequestId)
      if (currentPartyRequestId) {
        nav(`/party/edit/${currentPartyRequestId}`)
      } else {
        nav('/party/register');
      }
    } else {
      console.log('선택된 테마가 없습니다.');
    }
  };
  const handleScroll = () => {
    if (divRef.current) {
      const scrollTop = divRef.current.scrollTop;
      const scrollHeight = divRef.current.scrollHeight;
      const clientHeight = divRef.current.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        fetchNextPage();
      }
    }
  };

  const handleClick = (theme: IThemeListItem) => {
    if (loc.pathname.split('/').includes('history')) {
      historyWriteStore.setThemeId(theme.themeId);
      nav('/history/write');
    } else {
      nav(`/themes/${theme.themeId}`);
    }
  };

  useEffect(() => {
    if (divRef.current) divRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (divRef.current)
        divRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['themes'] });
    fetchNextPage();
  }, [searchThemeStore.filters]);

  return (
    <div ref={divRef} css={listContainer}>
      {data?.pages.map((page) => (
        <>
          {page.content?.themeList.map((theme: IThemeListItem, idx: number) => (
            <div key={theme.themeId} css={containerCss}>
              <ThemeItem
                key={idx}
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
        </>
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
