/** @jsxImportSource @emotion/react */
import React, { Suspense, useState } from 'react';
import { Region } from './Region';
import { Filters } from './Filters';
import { ErrorBoundary } from 'react-error-boundary';
import { container } from './styles';
import { Button } from '../../../components/Button';
import { Genre } from './Genre';
import { People } from './People';
import { Level } from './Level';
import { Brand } from './Brand';
import { Playtime } from './Playtime';
import { Price } from './Price';
import { useSearchThemesStore } from '../../../stores/themeStore';
import { useModal } from '../../../hooks/useModal';

export interface ThemeFiltersProps {
  type: string;
}

export const ThemeFilters = ({ type }: ThemeFiltersProps) => {
  const searchThemesStore = useSearchThemesStore();
  const modal = useModal();
  const [curType, setCurType] = useState<string>(type);

  const handler = (filter: string) => {
    setCurType(filter);
  };
  const clickHandler = () => {
    console.log(searchThemesStore.filters);
    modal.hide();
  };

  return (
    <div css={container}>
      <Filters selected={curType} handler={handler} />
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          {curType === 'region' && <Region />}
          {curType === 'genreList' && <Genre />}
          {curType === 'people' && <People />}
          {curType === 'level' && <Level />}
          {curType === 'brandId' && <Brand />}
          {curType === 'playtime' && <Playtime />}
          {curType === 'price' && <Price />}
        </Suspense>
      </ErrorBoundary>
      <Button rounded={0.5} handler={clickHandler}>
        적용하기
      </Button>
    </div>
  );
};
