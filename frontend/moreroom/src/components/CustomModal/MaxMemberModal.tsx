/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContainer = css`
  background: ${Colors['light']['100']};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
`;

const modalHeader = css`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${Colors['dark']['900']};
`;

const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const buttonStyle = css`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const confirmButton = css`
  ${buttonStyle};
  background-color: ${Colors['primary']['A200']};
  color: white;
`;

const cancelButton = css`
  ${buttonStyle};
  background-color: ${Colors['danger']['A200']};
  color: white;
`;

interface MaxMemberModalProps {
  title: string;
  initialValue: number;
  min: number;
  max: number;
  onConfirm: (value: number) => void;
  onCancel: () => void;
}

export const MaxMemberModal: React.FC<MaxMemberModalProps> = ({ title, initialValue, min, max, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <div css={modalBackground} onClick={onCancel}>
      <div css={modalContainer} onClick={(e) => e.stopPropagation()}>
        <div css={modalHeader}>{title}</div>
        <input
          type="range"
          min={min}
          max={10}
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
        <div>{inputValue}명</div>
        <div css={buttonContainer}>
          <button css={confirmButton} onClick={() => onConfirm(inputValue)}>
            확인
          </button>
          <button css={cancelButton} onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
