/** @jsxImportSource @emotion/react */
import React from 'react';
import { Icon } from '../../Icon';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Typography } from '../../Typography';
import { TitleProps } from './Title.types';
import { base, inputCss } from './Title.styles';

export const Title = ({
  type = 'default',
  backHandler = () => console.log('going back'),
  title = '타이틀',
  searchHandler = (value: string) => console.log('input value = ', value),
  ...props
}: TitleProps) => {
  return (
    <div css={base} {...props}>
      {type !== 'withoutBack' && (
        <Icon size={1.5} color="light" onClick={backHandler}>
          <ChevronLeftIcon />
        </Icon>
      )}
      {type === 'search' ? (
        <input
          placeholder="검색어를 입력해주세요"
          onChange={(e) => searchHandler(e.target.value)}
          css={inputCss}
          style={{ fontFamily: 'inherit' }}
        />
      ) : (
        <Typography weight={700} size={1} color="light">
          {title}
        </Typography>
      )}
    </div>
  );
};
