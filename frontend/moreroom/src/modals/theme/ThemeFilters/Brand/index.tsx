/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { container, input, inputContainer, items } from './styles';
import { Icon } from '../../../../components/Icon';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBrands } from '../../../../apis/infoApi';
import { IBrandCommon } from '../../../../types/infoTypes';
import { Item } from '../Item';

export const Brand = () => {
  const brandQuery = useSuspenseQuery({
    queryKey: ['brand'],
    queryFn: async () => await getBrands(),
  });

  if (brandQuery.error && !brandQuery.isFetching) {
    throw brandQuery.error;
  }

  const [keyword, setKeyword] = useState<string>('');
  const [brands, setBrands] = useState<IBrandCommon[]>([]);

  const handler = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

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
          css={input}
          placeholder="브랜드 이름을 입력해주세요"
          onChange={handler}
        />
        <Icon color="light" size={1.5}>
          <XMarkIcon />
        </Icon>
      </div>
      <div css={items}>
        {brands.map((brand: IBrandCommon) => (
          <Item key={brand.brandId} item={brand.brandName} />
        ))}
      </div>
    </div>
  );
};
