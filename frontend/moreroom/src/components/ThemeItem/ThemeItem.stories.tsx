import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeItem } from '.';
import { IThemeListItem } from '../../types/themeTypes';

const meta = {
  title: 'UI/Components/ThemeItem',
  component: ThemeItem,
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
    theme: {
      description: '',
    },
    pattern: {
      description: '검색 키워드입니다.',
    },
  },
} satisfies Meta<typeof ThemeItem>;

export default meta;

type Story = StoryObj<typeof ThemeItem>;

export const Primary: Story = {
  args: { pattern: '' },
  render: (args) => {
    const [themeItem, setThemeItem] = useState<IThemeListItem>({
      themeId: 1,
      title: 'Bad Rob Bad',
      poster: '주소',
      playtime: 80,
      genreList: ['스토리', '드라마'],
      regionId: '111000000',
      review: {
        count: 10,
        score: 4.5,
      },
      cafe: {
        cafeId: 34,
        brandName: '제로월드',
        branchName: '강남점',
        cafeName: '제로월드 강남점',
        address: '주소',
      },
      member: {
        playFlag: true,
      },
    });
    return (
      <div style={{ width: '328px' }}>
        <ThemeItem theme={themeItem} />
      </div>
    );
  },
};
