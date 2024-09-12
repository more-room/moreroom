import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './index';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

const meta = {
  title: 'UI/Components/Progress',
  component: Progress,
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
    size: {
      description: 'progress의 사이즈입니다.',
    },
    variant: {
      description: '테두리의 둥근 정도입니다.',
    },
    color: {
      description: '진행바의 색깔입니다.',
    },
    value: {
      description:
        '`0`에서 `max` 사이의 숫자를 의미합니다.\n현재 완료된 양을 나타냅니다.',
    },
    max: {
      description: '최대 `value`를 지정합니다.',
    },
    transparentBackground: {
      description: '`배경색이 투명한지 여부입니다.',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    size: 'sm',
    variant: 'rounded',
    color: 'primary',
    value: 1,
    max: 3,
    transparentBackground: false,
  },
};