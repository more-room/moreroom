import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InfoBox } from '.';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

const meta = {
  title: 'UI/Components/InfoBox',
  component: InfoBox,
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
      description: '아이콘을 넣어주세요',
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
} satisfies Meta<typeof InfoBox>;

export default meta;

type Story = StoryObj<typeof InfoBox>;

export const Primary: Story = {
  args: {
    children: 'text',
    color: 'primary',
    size: 1,
  },
};