/** @jsxImportSource @emotion/react */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from '.';
import { Backdrop } from '../Backdrop';

const meta = {
  title: 'UI/Components/Notification',
  component: Notification,
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
    ment: {
      description: '설명할 멘트입니다',
    },
    type: {
      description: 'Notification 의 종류입니다',
    },
    handler: {
      description: '확인 버튼에 대한 핸들러 함수입니다',
    },
  },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof Notification>;

export const Primary: Story = {
  args: {},
  render: (args) => (
    <div
      style={{
        width: '300px',
        height: '300px',
      }}
    >
      <Notification
        ment="이건 notification 입니다"
        type="confirm"
        handler={() => console.log('btn press')}
      />
    </div>
  ),
};

const types = ['confirm', 'alert'];

export const Types: Story = {
  args: {},
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        width: '1000px',
        height: '1000px',
      }}
    >
      <div
        style={{
          width: '360px',
          height: '800px',
          position: 'relative',
        }}
      >
        <Notification
          ment="이건 notification 입니다"
          type="confirm"
          handler={() => console.log('btn press')}
        />
      </div>
      <div
        style={{
          width: '360px',
          height: '800px',
          position: 'relative',
        }}
      >
        <Notification
          ment="이건 notification 입니다"
          type="alert"
          handler={() => console.log('btn press')}
        />
      </div>
    </div>
  ),
};
