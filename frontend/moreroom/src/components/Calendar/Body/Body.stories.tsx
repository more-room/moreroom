import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Body } from '.';
import { Colors } from '../../../styles/globalStyle';

const meta = {
  title: 'UI/Components/Calendar/Body',
  component: Body,
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
} satisfies Meta<typeof Body>;

export default meta;

type Story = StoryObj<typeof Body>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <div
        style={{ backgroundColor: `${Colors['grey']['800']}`, width: '280px' }}
      >
        <Body />
      </div>
    );
  },
};
