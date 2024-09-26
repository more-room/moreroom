/** @jsxImportSource @emotion/react */
import React from 'react';
import { nameContainer } from './styles';
import { LabeledTypography } from '../../../../components/LabeledTypography';
import {
  useCafePageStore,
  useSearchCafesStore,
  useSearchNameStore,
} from '../../../../stores/cafeStore';

export const SearchName = () => {
  const cafePageStore = useCafePageStore();
  const searchNameStore = useSearchNameStore();
  const searchCafesStore = useSearchCafesStore();

  /* 특정 카페 선택 핸들러 */
  const onHandleNameSelect = (cafeName: string) => {
    searchNameStore.setName(cafeName);
    cafePageStore.setType('default');

    const after = { ...searchCafesStore.filters, cafeName: cafeName };
    searchCafesStore.setFilters(after);
  };

  return (
    <div css={nameContainer}>
      {searchNameStore.results.cafeList.map((result) => {
        return (
          <LabeledTypography
            key={result.cafeId}
            str={result.cafeName}
            pattern={searchNameStore.cafeName}
            normalColor="light"
            highlightColor="primary"
            onClick={() => onHandleNameSelect(result.cafeName)}
          />
        );
      })}
    </div>
  );
};
