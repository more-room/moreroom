import React, { useState } from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeRecommend } from ".";
import { ThemeList } from "../../types/themeTypes";

const meta = {
  title: 'UI/Components/ThemeRecommend',
  component: ThemeRecommend,
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
      description:
        '검색 키워드입니다.',
    },
  },
} satisfies Meta<typeof ThemeRecommend>;

export default meta;

type Story = StoryObj<typeof ThemeRecommend>;

export const Primary: Story = {
  args: {pattern:''},
  render: () => {
    const [themeList, setThemeList] = useState<ThemeList>({
      themeList: [
        {
          poster: '/posters/heaven.png',
          title: 'HEAVEN',
          genrename: '스릴러',
          playtime: 60,
          reviewCount: 127,
          brandName: '넥스트 에디션',
          branchName: '건대2호점',
        },
      ],
    });
    return (
      <div style={{ width: '328px' }}>
        <ThemeRecommend theme={themeList.themeList[0]}/>
      </div>
    );
  },
};