/** @jsxImportSource @emotion/react */
import React from 'react';
import { base } from './InfoBox.styles';
import { InfoBoxProps } from './InfoBox.types';
import { ClockIcon, UserIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Colors, MainColors } from '../../styles/globalStyle';



export const InfoBox = ({
  color = 'primary',
  icon = <ClockIcon/>,  //아이콘을 붙여넣기 가능하게 
  fontSize = 1,
  fontWeight = 400,
  colorScale,
  size = 1.5,
  borderRadius = 0.8,
  children = '09월08일15:00',
  ...props
}: InfoBoxProps) => {
  // const iconColor = colorScale ? Colors[color][colorScale] : MainColors[color];  // 아이콘 색상
  const iconSize = fontSize * 1.2 + 'rem';  // 아이콘 크기 설정 (텍스트 크기와 연동)


  return (
    <div css={base( color, size, borderRadius, fontWeight, fontSize, colorScale, )} {...props}>
      <div className='text'>{children}</div>
      <div className='icon'>
        <Icon size={fontSize * 1.2} color='grey'>
          {/* <ClockIcon  style={{ color: Colors['grey']['500'], width: iconSize, height: iconSize }} />   */}
          {icon}
        </Icon>
      </div>
    </div>
  );
}
