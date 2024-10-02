/** @jsxImportSource @emotion/react */
import React, { Suspense, useState } from 'react';
import {
  checkmarkStyles,
  confirmButtonStyles,
  labelStyles,
  modalStyles,
  optionStyles,
} from './styles';
import { useModal } from '../../../hooks/useModal';

export const ReviewSortFetch = () => {
  const [selectedOption, setSelectedOption] = useState('방문 일자 순');
  const modal = useModal();
  const sortOptions = [
    '방문 일자 순',
    '최신 작성순',
    '오래된 작성순',
    '높은 별점순',
  ];
  const clickHandler = () => {
    // console.log(searchThemesStore.filters);
    modal.hide();
  };

  return (
    <div css={modalStyles}>
      {sortOptions.map((option) => (
        <div
          key={option}
          css={optionStyles}
          onClick={() => setSelectedOption(option)}
        >
          <span css={labelStyles}>{option}</span>
          {selectedOption === option && <span css={checkmarkStyles}>✓</span>}
        </div>
      ))}
      <button css={confirmButtonStyles} onClick={clickHandler}>
        확인
      </button>
    </div>
  );
};
