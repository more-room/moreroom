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
    color: {
      description: '글자 색상입니다.\n기본 색상은 grey 입니다.',
    },
    scale: {
      description:
        '적용할 컬러 스케일입니다.\n입력되지 않으면 MainColor가 적용됩니다.',
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
    children: 'text',
    color: 'primary',
    size: 1,
    weight: 400,

  },
};