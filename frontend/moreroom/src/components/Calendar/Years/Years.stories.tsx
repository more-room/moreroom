import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Years } from '.';
import { Colors } from '../../../styles/globalStyle';

const meta = {
  title: 'UI/Components/Calendar/Years',
  component: Years,
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
} satisfies Meta<typeof Years>;

export default meta;

type Story = StoryObj<typeof Years>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [curYear, setCurYear] = useState<number>(2015);

    return (
      <div
        style={{ backgroundColor: `${Colors['grey']['800']}`, width: '280px' }}
      >
        <Years />
      </div>
    );
  },
};
