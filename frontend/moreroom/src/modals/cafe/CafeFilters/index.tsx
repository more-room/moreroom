/** @jsxImportSource @emotion/react */
import React, { Suspense, useState } from 'react';
import { Region } from './Region';
import { ErrorBoundary } from 'react-error-boundary';
import { container } from './styles';
import { Brand } from './Brand';
import { Filters } from './Filters';
import { useModal } from '../../../hooks/useModal';
import { useSearchCafesStore } from '../../../stores/cafeStore';
import { Button } from '../../../components/Button';

export interface CafeFiltersProps {
  type: string;
}

export const CafeFilters = ({ type }: CafeFiltersProps) => {
  const modal = useModal();
  const searchCafesStore = useSearchCafesStore();
  const [curType, setCurType] = useState<string>(type);

  const handler = (filter: string) => {
    setCurType(filter);
  };
  const clickHandler = () => {
    console.log(searchCafesStore.filters);
    modal.hide();
  };

  return (
    <div css={container}>
      <Filters selected={curType} handler={handler} />
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          {curType === 'region' && <Region />}
          {curType === 'brandId' && <Brand />}
        </Suspense>
      </ErrorBoundary>
      <Button rounded={0.5} handler={clickHandler}>
        적용하기
      </Button>
    </div>
  );
};
