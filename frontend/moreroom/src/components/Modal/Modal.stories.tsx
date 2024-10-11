/** @jsxImportSource @emotion/react */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '.';
import { Typography } from '../Typography';

const meta = {
  title: 'UI/Components/Modal',
  component: Modal,
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
    height: {
      description: '모달의 높이입니다(0~100%)',
    },
    children: {
      description: '모달의 내용입니다',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
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
          height: '700px',
          position: 'relative',
        }}
      >
        <Modal>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="light" size={2} weight={700}>
              이것은 모달입니다
            </Typography>
          </div>
        </Modal>
      </div>
    </div>
  ),
};
