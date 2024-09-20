import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeItem } from '.';
import { IThemeCommon } from '../../types/themeTypes';
import { count } from 'console';

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
  render: () => {
    const [themeList, setThemeList] = useState<IThemeCommon>({
      {
        themeId: 1;
        title: 'Heaven';
        poster: '/posters/heaven.png';
        playtime: 80;
        genreList: ['공포', '미스테리', '추리'];
        review: {
          count: 127,
          score: 0,
        };
      },
    });
    return (
      <div style={{ width: '328px' }}>
        <ThemeItem theme={themeList.themeList[0]} />
      </div>
    );
  },
};
