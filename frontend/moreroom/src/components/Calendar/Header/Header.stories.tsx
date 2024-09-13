import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';
import { Colors } from '../../../styles/globalStyle';

const meta = {
  title: 'UI/Components/Calendar/Header',
  component: Header,
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
    year: {
      description: '년도',
    },
    month: {
      description: '월',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <div style={{ backgroundColor: `${Colors['grey']['900']}` }}>
        <Header />
      </div>
    );
  },
};
