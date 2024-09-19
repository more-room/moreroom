/** @jsxImportSource @emotion/react */
import { StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../Icon';
import { Palette } from '../../types/globalStyleTypes';
import {
  base,
  backgroundCss,
  containerCss,
  glowCss,
  glowStarCss,
  filledCss,
} from './Rating.styles';

export const CustomStarIcon: React.FC<{
  fill: number;
  size?: number;
  activeColor: Palette;
  transparentBackground: boolean;
  isDragging: boolean;
  disabled: boolean;
}> = ({ fill, size = 1.5, activeColor, transparentBackground, isDragging, disabled }) => {
  return (
    <div css={containerCss(size)}>
      {/* 드래그 중일 때 나타나는 별 효과 */}
      {isDragging && !disabled && (
        <div css={[base, glowCss]}>
          <Icon size={size}>
            <StarIcon css={glowStarCss(activeColor)} />
          </Icon>
        </div>
      )}

      {/* 점수 없을 때 기본 배경 */}
      <Icon size={size}>
        <StarIcon css={[base, backgroundCss(transparentBackground)]} />
      </Icon>

      {/* 점수에 따른 별 색상 */}
      <div css={[base, filledCss(fill)]}>
        <Icon color={activeColor} size={size}>
          <StarIcon />
        </Icon>
      </div>
    </div>
  );
};





