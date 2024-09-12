import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Right } from '.';

const meta = {
  title: 'UI/Components/TopBar/Right',
  component: Right,
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
      description: '나타낼 아이콘입니다',
    },
    handler: {
      description: '아이콘을 클릭했을 때의 핸들러 함수입니다',
    },
  },
} satisfies Meta<typeof Right>;

export default meta;

type Story = StoryObj<typeof Right>;

export const Primary: Story = {
  args: {},
  render: () => (
    <div
      style={{
        width: 'fit-content',
        backgroundColor: '#313131',
        padding: '1rem',
      }}
    >
      <Right handler={() => console.log('right icon click')} />
    </div>
  ),
};
