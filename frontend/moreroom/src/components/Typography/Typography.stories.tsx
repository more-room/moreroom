import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '.';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';

const meta = {
  title: 'UI/Components/Typography',
  component: Typography,
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
      description: 'text를 입력해주세요',
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
    weight: {
      description: '적용할 굵기입니다.',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: 'Typography',
    color: 'dark',
    size: 1,
    weight: 700,
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
const sizes: number[] = [0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25];
const weights: FontWeight[] = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export const MainColors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <Typography key={color} {...args} color={color}>
          {color}
        </Typography>
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
              <Typography key={scale} {...args} color={color} scale={scale}>
                {scale}
              </Typography>
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
        <Typography key={size} {...args} size={size}>
          {size}rem
        </Typography>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {weights.map((weight) => (
        <Typography key={weight} {...args} weight={weight}>
          {weight}
        </Typography>
      ))}
    </div>
  ),
};
