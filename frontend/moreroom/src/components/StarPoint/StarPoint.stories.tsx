import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { StarPoint } from '.';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { StarIcon } from "@heroicons/react/24/solid";

const meta = {
  title: 'UI/Components/StarPoint',
  component: StarPoint,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['!autodocs'],
  argTypes: {
    children: {
      description: '아이콘과 텍스트를 넣어주세요',
    },
    color: {
      description: '적용할 컬러입니다.\n기본 색상은 primary 입니다.',
    },
    scale: {
      description:
        '적용할 컬러스케일입니다.\n입력되지 않으면 MainColor가 적용됩니다.',
    },
    size: {
      description: '적용할 사이즈입니다.\nrem 단위로 입력하면 됩니다.',
    },
  },
} satisfies Meta<typeof StarPoint>;

export default meta;

type Story = StoryObj<typeof StarPoint>;

export const Primary: Story = {
  args: {
    children: '3.8',
    color: 'primary',
    size: 4,
  },
};

const colors: Palette[] = [
  'primary',
  'secondary',
  'danger',
  'grey',
  'dark',
  'light',
];
const scales: ColorScale[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'A100',
  'A200',
  'A400',
  'A700',
];
const sizes: number[] = [3.5, 3.625, 3.75, 3.875, 4, 4.125, 4.25];


export const MainColors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <StarPoint key={color} {...args} color={color}>
          {args.children}
        </StarPoint>
      ))}
    </div>
  ),
};

export const ColorsWithScales: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div>
      {colors.map((color) => (
        <div
          key={color}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
        >
          {color != 'dark' &&
            color != 'light' &&
            scales.map((scale) => (
              <StarPoint key={scale} {...args} color={color} scale={scale}>
                {args.children}
              </StarPoint>
            ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((size) => (
        <StarPoint key={size} {...args} size={size}>
          {args.children}
        </StarPoint>
      ))}
    </div>
  ),
};
