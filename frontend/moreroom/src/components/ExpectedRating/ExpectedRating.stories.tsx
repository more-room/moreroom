import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ExpectedRating } from '.';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';
import { bool } from 'prop-types';
import { MainColors } from '../Typography/Typography.stories';
import { Colors } from '../../styles/globalStyle';

const meta = {
  title: 'UI/Components/ExpectedRating',
  component: ExpectedRating,
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
    size: {
      description: '적용할 사이즈입니다.\nrem 단위로 입력하면 됩니다.',
    },
    weight: {
      description: '적용할 굵기입니다.',
    },
    border: {
      description: '적용할 테두리 굵기 입니다.'
    },
    borderRadius: {
      description: '적용할 테두리 굴곡 입니다.'
    }
  },
} satisfies Meta<typeof ExpectedRating>;

export default meta;

type Story = StoryObj<typeof ExpectedRating>;

export const Primary: Story = {
  args: {
    children: ['예상', '4.5'],
    // color: 'primary',
    size: 1,
    weight: 600,
    border: 0,
  },
};

const sizes: number[] = [0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25];

export const ExpectedRatingSizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((size) => (
        <ExpectedRating key={size} {...args} size={size}>
          {['예상', `${size}rem`]}
        </ExpectedRating>
      ))}
    </div>
  ),
}
