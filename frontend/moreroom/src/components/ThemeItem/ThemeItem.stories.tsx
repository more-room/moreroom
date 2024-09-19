import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeItemInfo } from ".";

const meta = {
  title: 'UI/Components/ThemeItemInfo',
  component: ThemeItemInfo,
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
    brandName: {
      description: '방탈출 브랜드 이름입니다.',
    },
    branchName: {
      description: '방탈출 지점 이름입니다.',
    },
    playtime: {
      description:
        '방탈출 플레이타임입니다.',
    },
    review: {
      description:
        '방탈출 리뷰 갯수입니다.',
    },
  },
} satisfies Meta<typeof ThemeItemInfo>;

export default meta;

type Story = StoryObj<typeof ThemeItemInfo>;

export const Primary: Story = {
  args: {
    poster: './assets/image/2ways.jpg',
    title: '2ways',
    genreList: ['기타', '추리', '미스터리'],
    brandName:'넥스트 에디션',
    branchName:'건대 2호점',
    playtime:80,
    review:127,
  },
};