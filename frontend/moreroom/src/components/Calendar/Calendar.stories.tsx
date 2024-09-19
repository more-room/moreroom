import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '.';
import dayjs from 'dayjs';
import { useCalendarStore } from '../../stores/calendarStore';

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
  render: (args) => {
    const bodyType = useCalendarStore((state) => state.bodyType);
    return (
      <div style={{ width: '320px' }}>
        <Calendar>
          <Calendar.Header />
          {bodyType === 'default' && <Calendar.DefaultBody />}
          {bodyType === 'year' && <Calendar.YearBody />}
          {bodyType === 'month' && <Calendar.MonthBody />}
        </Calendar>
      </div>
    );
  },
};
