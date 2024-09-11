import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import { Palette } from '../../types/globalStyleTypes';

const meta = {
  title: 'UI/Components/Button',
  component: Button,
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
      description: '버튼 안에 표시할 텍스트입니다.',
    },
    variant: {
      description: '버튼의 스타일입니다.',
    },
    color: {
      description: '적용할 컬러 팔레트입니다.',
    },
    disabled: {
      description: '버튼의 비활성화 여부입니다.',
    },
    fullwidth: {
      description: '`width`를 상위 노드의 크기에 맞출지 여부입니다.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'contained',
    disabled: false,
    fullwidth: false
  },
};

const colors: Palette[] = [
  'primary',
  'secondary',
  'danger',
  'grey',
  'dark',
  'light',
]