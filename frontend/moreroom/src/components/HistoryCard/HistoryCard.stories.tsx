import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HistoryCard } from '.';
import { IHistoryList } from '../../types/historyTypes';

const meta = {
  title: 'UI/Components/HistoryCard',
  component: HistoryCard,
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
  argTypes: {},
} satisfies Meta<typeof HistoryCard>;

export default meta;

type Story = StoryObj<typeof HistoryCard>;

export const Primary: Story = {
  args: {},
  render: () => {
    const [historyList, setHistoryList] = useState<IHistoryList>({
      historyList: [
        {
          historyId: 1,
          theme: {
            themeId: 4,
            title: '냥탐정 셜록 캣',
            cafeName: '황금열쇠 더킹점',
            poster: '/posters/냥탐정셜록캣.png',
          },
          date: '2024-09-30 15:00',
          memberPlayTime: 2848,
          hintCount: 2,
        },
      ],
    });
    return (
      <div style={{ width: '328px' }}>
        <HistoryCard history={historyList.historyList[0]} />
      </div>
    );
  },
};
