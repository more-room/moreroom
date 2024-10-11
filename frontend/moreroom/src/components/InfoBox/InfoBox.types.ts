 import { ReactNode } from 'react';
 import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';

 export interface InfoBoxProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: Palette;
  icon?: ReactNode;
  // backgroundColor?: Palette;
  colorScale?: ColorScale;  // 추가: 텍스트 컬러에 대한 스케일
  // backgroundColorScale?: ColorScale;  // 추가: 배경 컬러에 대한 스케일
  // scale?: ColorScale;
  size: number;
  fontSize?: number;
  fontWeight?: FontWeight;
  borderRadius?: number;
 }