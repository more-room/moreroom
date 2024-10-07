import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const loginpagecontainer = css`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const imgCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 3rem;

  img {
    width: 18rem; /* 작은 화면에 맞게 이미지 크기 조정 */
    height: auto;
    max-width: 100%;
  }

  @media (max-width: 360px) {
    img {
      width: 14rem; /* 360px 이하 화면에 맞춰 이미지 크기 줄임 */
    }
  }
`;

// 폼 스타일
export const formStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .MuiTextField-root {
    width: 90%; /* 화면에 맞춰 너비 조정 */
    max-width: 25rem; /* 최대 너비를 25rem으로 설정 */
    margin-bottom: 2rem;
  }

  .custom-textfield .MuiOutlinedInput-root {
    width: 100%;

    &::placeholder {
      color: ${Colors['grey']['300']}; /* 플레이스홀더 색상 변경 */
      opacity: 1; /* Firefox에서는 기본값이 낮게 설정되어 있으므로 명시적으로 설정 */
    }

    fieldset {
      border-color: ${Colors['grey']['300']};
      color: ${Colors['grey']['300']};
    }
    &:hover fieldset {
      border-color: ${Colors['grey']['300']};
    }
    &.Mui-focused fieldset {
      border-color: ${Colors['grey']['300']};
    }
    & label {
      color: ${Colors['grey']['300']};
    }
    input {
      color: ${Colors['grey']['300']};
    }
  }
  .MuiFormHelperText-root {
      margin-left: 0;
      margin-top: 0.5rem;
    }
`;

// 버튼 스타일
export const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  cursor: pointer;
  width: 50%; /* 작은 화면에 맞춰 버튼 너비 설정 */
  max-width: 25rem;
  padding: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0 1rem;

  @media (max-width: 360px) {
    font-size: 0.875rem; /* 360px 이하 화면에서 버튼 텍스트 크기 줄임 */
    padding: 0.8rem;
  }
`;

export const iconcolors = css`
  color: ${Colors['primary']['500']};
`;
