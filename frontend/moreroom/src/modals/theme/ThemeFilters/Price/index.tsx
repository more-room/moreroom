/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { container, range } from './styles';
import { Typography } from '../../../../components/Typography';
import Slider from '@mui/material/Slider';
import { useSearchThemesStore } from '../../../../stores/themeStore';
import { addComma } from '../../../../utils/priceUtils';

export const Price = () => {
  const searchThemesStore = useSearchThemesStore();
  const [price, setPrice] = useState<number>(30000);

  return (
    <div css={container}>
      <div css={range}>
        <Typography color="light" size={0.875} weight={400}>
          {addComma(10000)}원
        </Typography>
        <Typography color="light" size={0.875} weight={400}>
          {addComma(300000)}원
        </Typography>
      </div>
      <Slider
        defaultValue={price}
        step={10000}
        min={10000}
        max={300000}
        color={'secondary'}
        onChange={(e, v) => {
          setPrice(Number(v));
          const after = { ...searchThemesStore.filters, price: Number(v) };
          searchThemesStore.setFilters(after);
        }}
      />
      <Typography
        size={1}
        color="light"
        weight={700}
        style={{ textAlign: 'center' }}
      >
        {addComma(price) + '원'}
      </Typography>
    </div>
  );
};
