import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '.';

const meta = {
  title: 'UI/Components/TopBar/Title',
  component: Title,
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
    type: {
      description: '필수, TopBar 의 종류입니다',
    },
    backHandler: {
      description: '선택, 뒤로가기 아이콘을 눌렀을 때 동작할 핸들러 함수입니다',
    },
    title: {
      description: '선택, TopBar 에 표시된 타이틀입니다',
    },
    searchHandler: {
      description: '선택, input change 핸들러 함수입니다',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof Title>;

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
      <Title type="default" />
    </div>
  ),
};
