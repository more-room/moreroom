import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from '.';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const meta = {
  title: 'UI/Components/TopBar',
  component: TopBar,
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
    bgColor: {
      description: '선택, 배경색',
    },
    bgColorScale: {
      description: '선택, 배경색 스케일',
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Primary: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar>
        <TopBar.Title type="default" />
        <TopBar.Right handler={() => console.log('right icon click')} />
      </TopBar>
    </div>
  ),
};

export const WithoutBack: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar>
        <TopBar.Title type="withoutBack" />
        <TopBar.Right handler={() => console.log('right icon click')} />
      </TopBar>
    </div>
  ),
};

export const WithoutRight: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar>
        <TopBar.Title type="default" />
      </TopBar>
    </div>
  ),
};

export const Search: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar>
        <TopBar.Title type="search" />
        <TopBar.Right
          icon={<MagnifyingGlassIcon />}
          handler={() => console.log('right icon click')}
        />
      </TopBar>
    </div>
  ),
};
