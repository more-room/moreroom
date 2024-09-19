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
