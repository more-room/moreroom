/** @jsxImportSource @emotion/react */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from '.';
import { css } from '@emotion/react';
import { Typography } from '../Typography';

const meta = {
  title: 'UI/Components/Backdrop',
  component: Backdrop,
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
    children: {
      description: 'Backdrop 위에 표시할 콘텐츠',
    },
    opacity: {
      description: '투명도 0~100(%)',
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    blur: {
      description: '흐림도 0~100(%)',
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Primary: Story = {
  args: {},
  render: (args) => (
    <>
      <div style={{ padding: '1rem', color: 'black' }}>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
      </div>
      <Backdrop {...args}></Backdrop>
    </>
  ),
};
