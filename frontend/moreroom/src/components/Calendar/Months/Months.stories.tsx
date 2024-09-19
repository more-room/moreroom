import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Months } from '.';
import { Colors } from '../../../styles/globalStyle';

const meta = {
  title: 'UI/Components/Calendar/Months',
  component: Months,
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
} satisfies Meta<typeof Months>;

export default meta;

type Story = StoryObj<typeof Months>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [curMonth, setCurMonth] = useState<number>(9);

    return (
      <div
        style={{ backgroundColor: `${Colors['grey']['800']}`, width: '280px' }}
      >
        <Months month={curMonth} setMonth={setCurMonth} />
      </div>
    );
  },
};
