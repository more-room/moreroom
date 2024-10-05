/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { containerCss, confirmButtonStyles, optionStyles, labelStyles, checkmarkStyles } from './styles';

interface ReviewSortFetchProps {
  onSelect: (option: string) => void; // onSelect 프로퍼티 타입 정의
}

export const ReviewSortFetch: React.FC<ReviewSortFetchProps> = ({
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState('방문 일자 순');
  const sortOptions = [
    '최신 작성순',
    '오래된 작성순',
    '높은 별점순',
  ];
  const modal = useModal();

  const clickHandler = () => {
    onSelect(selectedOption); // 선택한 옵션을 상위 컴포넌트로 넘겨줌
    modal.hide(); // 모달 닫기
  };

  return (
    <div css={containerCss}>
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
