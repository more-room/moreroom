import { ReactNode } from 'react';
import {Palette } from '../../types/globalStyleTypes';

export interface RatingProps {
  count: number;
  value: number;
  size?: number;
  activeColor?: Palette;
  transparentBackground?: boolean;
  disabled?:boolean;
  onChange?: (value: number) => void;
}

// 터치가 안되는 거 -> 리뷰 보기 기능에서 사용
// 뒤의 효과? 추가? -> 색은 그냥 선택하는 거랑 똑같이 하면 될듯
// 마우스 말고 터치로 되게 하기
// inactiveColor는 뒤에 회색을 넣거나 아니면 아예 투명으로 하게
