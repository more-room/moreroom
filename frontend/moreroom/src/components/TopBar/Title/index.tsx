/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { Icon } from '../../Icon';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Typography } from '../../Typography';
import { TitleProps } from './Title.types';
import { base, inputCss } from './Title.styles';

export const Title = ({
  type = 'default',
  backHandler = () => console.log('going back'),
  title = '타이틀',
  defaultValue,
  searchHandler = (value: string) => console.log('input value = ', value),
  ...props
}: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  return (
    <div css={base} {...props}>
      {type !== 'withoutBack' && (
        <Icon size={1.5} color="light" onClick={backHandler}>
          <ChevronLeftIcon />
        </Icon>
      )}
      {type === 'search' ? (
        <input
          ref={inputRef}
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
