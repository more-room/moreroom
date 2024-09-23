import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSimpleInfo } from '.';
import { IThemeCommon } from '../../types/themeTypes';

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
    const [theme, setTheme] = useState<IThemeCommon>({
      themeId: 1,
      poster: '/posters/last.png',
      title: 'LAST',
      playtime: 60,
      review: {
        count: 10,
        score: 4.5,
      },
      genreList: ['스토리', '드라마'],
      member: {
        playFlag: true,
      },
    });
    return (
      <div style={{ width: '328px' }}>
        <ThemeSimpleInfo theme={theme} />
      </div>
    );
  },
};
