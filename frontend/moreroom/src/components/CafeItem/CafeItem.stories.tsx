import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CafeItem } from '.';
import { ICafeListItem } from '../../types/cafeTypes';

const meta = {
  title: 'UI/Components/CafeItem',
  component: CafeItem,
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
    cafe: {
      description: '카페 정보입니다.',
    },
    pattern: {
      description: '검색 키워드입니다.',
    },
  },
} satisfies Meta<typeof CafeItem>;

export default meta;

type Story = StoryObj<typeof CafeItem>;

export const Primary: Story = {
  args: { pattern: '', onList: false },
  render: (args) => {
    const [cafeItem, setCafeItem] = useState<ICafeListItem>({
      cafeId: 1,
      brandId: 1,
      regionId: '1',
      address: '주소 1입니다',
      cafeName: '1번 카페입니다',
      latitude: 35.8664273,
      longitude: 128.5969341,
      themeCount: 1,
      themePoster: '/posters/last.png',
      reviewCount: 127,
    });
    return (
      <div style={{ width: '328px' }}>
        <CafeItem {...args} cafe={cafeItem} />
      </div>
    );
  },
};
