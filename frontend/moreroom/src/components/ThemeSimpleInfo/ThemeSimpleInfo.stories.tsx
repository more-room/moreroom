import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSimpleInfo } from ".";


const meta = {
  title: 'UI/Components/ThemeSimpleInfo',
  component: ThemeSimpleInfo,
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
    poster: {
      description: '방탈출 포스터 url입니다.',
    },
    title: {
      description: '방탈출 타이틀입니다.',
    },
    genreList: {
      description:
        '방탈출 장르 리스트입니다.',
    },
  },
} satisfies Meta<typeof ThemeSimpleInfo>;

export default meta;

type Story = StoryObj<typeof ThemeSimpleInfo>;

export const Primary: Story = {
  args: {
    poster: './assets/image/2ways.jpg',
    title: '2ways',
    genreList: ['기타', '추리', '미스터리'],
  },
};