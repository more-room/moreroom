/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBar } from '../../../components/TopBar';
import { container } from './styles';
import { SearchName } from './SearchName';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  useCafePageStore,
  useSearchCafesStore,
  useSearchNameStore,
} from '../../../stores/cafeStore';
import { getCafeNames } from '../../../apis/cafeApi';
import { SearchList } from './SearchList';

export const CafeList = () => {
  const cafePageStore = useCafePageStore();
  const searchNameStore = useSearchNameStore();
  const searchCafesStore = useSearchCafesStore();

  /* 카페 이름 검색 핸들러 */
  const onSearchHandler = async (value: string) => {
    if (cafePageStore.type === 'default') cafePageStore.setType('search');

    searchNameStore.setName(value);
    await getCafeNames(value)
      .then((res) => searchNameStore.setResults(res.data))
      .catch((err) => console.log(err));
  };

  /* 뒤로가기 핸들러 */
  const onBackHandler = () => {
    if (cafePageStore.type === 'search') cafePageStore.setType('default');
  };

  /* 아이콘 핸들러 */
  const onTitleHandler = () => {
    const after = {
      ...searchCafesStore.filters,
      cafeName: searchNameStore.cafeName,
    };
    searchCafesStore.setFilters(after);
    cafePageStore.setType('default');
  };

  return (
    <div css={container}>
      <TopBar>
        <TopBar.Title
          type="search"
          defaultValue={searchNameStore.cafeName}
          searchHandler={onSearchHandler}
          backHandler={onBackHandler}
        />
        <TopBar.Right icon={<MagnifyingGlassIcon />} handler={onTitleHandler} />
      </TopBar>
      {cafePageStore.type === 'search' && <SearchName />}
      {cafePageStore.type === 'default' && <SearchList />}
    </div>
  );
};
