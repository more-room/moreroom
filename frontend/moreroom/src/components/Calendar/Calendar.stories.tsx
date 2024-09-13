import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '.';

const meta = {
  title: 'UI/Components/Calendar',
  component: Calendar,
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
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
  args: {},
};
