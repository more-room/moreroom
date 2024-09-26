/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { container, input, inputContainer, items } from './styles';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchCafesStore } from '../../../../stores/cafeStore';
import { getBrands } from '../../../../apis/infoApi';
import { IBrandCommon } from '../../../../types/infoTypes';
import { Icon } from '../../../../components/Icon';
import { Item } from '../../../theme/ThemeFilters/Item';

export const Brand = () => {
  const brandQuery = useSuspenseQuery({
    queryKey: ['brand'],
    queryFn: async () => await getBrands(),
  });

  if (brandQuery.error && !brandQuery.isFetching) {
    throw brandQuery.error;
  }

  const searchCafesStore = useSearchCafesStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [brands, setBrands] = useState<IBrandCommon[]>([]);

  const handler = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);
  const handleFilter = (isAdd: boolean, brandId: number) => {
    if (isAdd) {
      const after = { ...searchCafesStore.filters, brandId: brandId };
      searchCafesStore.setFilters(after);
    } else {
      const after = { ...searchCafesStore.filters };
      delete after.brandId;
      searchCafesStore.setFilters(after);
    }
  };

  useEffect(() => {
    const afterFilter = brandQuery.data.data.brandList.filter(
      (brand: IBrandCommon) => {
        return brand.brandName.includes(keyword);
      },
    );
    setBrands(() => afterFilter);
  }, [keyword]);

  return (
    <div css={container}>
      <div css={inputContainer}>
        <input
          ref={inputRef}
          css={input}
          placeholder="브랜드 이름을 입력해주세요"
          onChange={handler}
        />
        <Icon
          color="light"
          size={1.5}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = '';
            }
            setKeyword('');
          }}
        >
          <XMarkIcon />
        </Icon>
      </div>
      <div css={items}>
        {brands.map((brand: IBrandCommon) => (
          <Item
            key={brand.brandId}
            item={brand.brandName}
            selected={searchCafesStore.filters.brandId === brand.brandId}
            handler={() => {
              handleFilter(
                !(brand.brandId === searchCafesStore.filters.brandId),
                brand.brandId,
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
