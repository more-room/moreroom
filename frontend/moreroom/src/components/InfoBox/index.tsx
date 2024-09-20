/** @jsxImportSource @emotion/react */
import React from 'react';
import { base } from './InfoBox.styles';
import { InfoBoxProps } from './InfoBox.types';
import { ClockIcon  } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Colors, MainColors } from '../../styles/globalStyle';

export const InfoBox = ({
  color = 'primary',
  backgroundColor = 'grey', 
  fontSize = 1.5,
  fontWeight = 400,
  colorScale,
  backgroundColorScale,
  size = 1.5,
  borderRadius = 0.5,
  children = 'text',
  ...props
}: InfoBoxProps) => {
  const iconColor = colorScale ? Colors[color][colorScale] : MainColors[color];  // 아이콘 색상
  const iconSize = fontSize * 1.2 + 'rem';  // 아이콘 크기 설정 (텍스트 크기와 연동)

  return (
    <div css={base( color, backgroundColor, size, borderRadius, fontWeight, fontSize, colorScale, backgroundColorScale )} {...props}>
      <div className='text'>{children}</div>
      <div className='icon'>
        <Icon>
          <ClockIcon  style={{ color: iconColor, width: iconSize, height: iconSize }} />  {/* 아이콘 색상 및 크기 적용 */}
        </Icon>
      </div>
    </div>
  );
}
