import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomBar } from '.';
import BellIcon from '@heroicons/react/24/solid/BellIcon';

const meta = {
  title: 'UI/Components/BottomBar',
  component: BottomBar,
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
    icons: {
      description: '메뉴의 아이콘들입니다',
    },
    menus: {
      description: '메뉴들입니다',
    },
    onHandleChange: {
      description: '메뉴 변경 시 핸들러 함수입니다',
    },
    defaultSelect: {
      description: '초기 선택 메뉴입니다',
    },
  },
} satisfies Meta<typeof BottomBar>;

export default meta;

type Story = StoryObj<typeof BottomBar>;

export const Primary: Story = {
  args: {
    icons: [<BellIcon />, <BellIcon />, <BellIcon />],
    menus: ['메뉴1', '메뉴2', '메뉴3'],
    onHandleChange: (menu: number) => console.log('change to ', menu),
  },
};
