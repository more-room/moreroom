import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconTypoMenu } from '.';
import BellIcon from '@heroicons/react/24/solid/BellIcon';

const meta = {
  title: 'UI/Components/IconTypoMenu',
  component: IconTypoMenu,
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
    icon: {
      description: '메뉴의 아이콘입니다',
    },
    menu: {
      description: '메뉴입니다',
    },
    selected: {
      description: '메뉴의 선택 여부입니다',
    },
  },
} satisfies Meta<typeof IconTypoMenu>;

export default meta;

type Story = StoryObj<typeof IconTypoMenu>;

export const Primary: Story = {
  args: {
    icon: <BellIcon />,
    menu: '메뉴',
  },
};

export const Selection: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <IconTypoMenu {...args} selected={false} />
      <IconTypoMenu {...args} selected={true} />
    </div>
  ),
};
