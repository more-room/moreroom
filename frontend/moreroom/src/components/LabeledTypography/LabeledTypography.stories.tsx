import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LabeledTypography } from '.';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';

const meta = {
  title: 'UI/Components/LabeledTypography',
  component: LabeledTypography,
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
    str: {
      description: '필수, 원본 문자열입니다',
    },
    pattern: {
      description: '필수, 강조할 패턴입니다',
    },
    normalColor: {
      description: '선택, 일반 문자열의 색상입니다',
    },
    highlightColor: {
      description: '선택, 강조된 문자열의 색상입니다',
    },
    weight: {
      description: '선택, 문자의 굵기입니다',
    },
    size: {
      description: '선택, 문자의 크기입니다',
    },
  },
} satisfies Meta<typeof LabeledTypography>;

export default meta;

type Story = StoryObj<typeof LabeledTypography>;

export const Primary: Story = {
  args: {
    str: 'Heaven',
    pattern: 'a',
    normalColor: 'dark',
  },
};
