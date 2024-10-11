/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { Button } from '../../../components/Button';
import {
  containerCss,
  confirmButtonStyles,
  optionStyles,
  labelStyles,
  checkmarkStyles,
} from './styles';

interface ReviewSortFetchProps {
  sortOption: string,
  onSelect: (option: string) => void;
}

export const ReviewSortFetch = ({ sortOption, onSelect }: ReviewSortFetchProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(sortOption);
  const sortOptions = ['최신 작성순', '오래된 작성순', '높은 별점순'];
  const modal = useModal();

  const clickHandler = () => {
    onSelect(selectedOption);
    modal.hide();
  };

  return (
    <div css={containerCss}>
      {sortOptions.map((option) => {
        const isChecked = selectedOption === option;

        return (
          <div
            key={option}
            css={optionStyles}
            onClick={() => setSelectedOption(option)}
          >
            <span css={labelStyles}>{option}</span>
            <span css={checkmarkStyles(isChecked)}>✓</span>
          </div>
        );
      })}
      <Button css={confirmButtonStyles} rounded={0.3125} handler={clickHandler}>
        확인
      </Button>
    </div>
  );
};
