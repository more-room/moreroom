import React, { useState } from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSimpleInfo } from ".";
import { ThemeList } from "../../types/themeTypes";


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
    theme: {
      description: '',
    },
  },
} satisfies Meta<typeof ThemeSimpleInfo>;

export default meta;

type Story = StoryObj<typeof ThemeSimpleInfo>;

export const Primary: Story = {
  args: {},
  render: () => {
    const [themeList, setThemeList] = useState<ThemeList>({
      themeList: [
        {
          poster: '/posters/heaven.png',
          title: 'HEAVEN',
          genrename: '스릴러',
        },
      ],
    });
    return (
      <div style={{ width: '328px' }}>
        <ThemeSimpleInfo theme={themeList.themeList[0]} />
      </div>
    );
  },
};