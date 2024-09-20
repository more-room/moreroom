import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Date } from '.';
import { TDate } from './Date.types';

const meta = {
  title: 'UI/Components/Date',
  component: Date,
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
    date: {
      description: '날짜입니다',
    },
    type: {
      description: '날짜의 종류입니다',
    },
    selected: {
      description: '날짜의 선택 여부입니다',
    },
    hasContents: {
      description: '날짜에 컨텐츠가 있는지 여부입니다',
    },
  },
} satisfies Meta<typeof Date>;

export default meta;

type Story = StoryObj<typeof Date>;

export const Primary: Story = {
  args: {
    date: 17,
  },
  render: (args) => (
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#424242',
      }}
    >
      <Date {...args} />
    </div>
  ),
};

const types: TDate[] = ['default', 'disable', 'sun', 'sat'];

export const Types: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div
      style={{
        width: '360px',
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#424242',
      }}
    >
      {types.map((type) => (
        <Date {...args} type={type} />
      ))}
    </div>
  ),
};

export const HasContents: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div
      style={{
        width: '360px',
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#424242',
      }}
    >
      <Date {...args} hasContents={true} />
      <Date {...args} hasContents={false} />
    </div>
  ),
};

export const Selected: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div
      style={{
        width: '360px',
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#424242',
      }}
    >
      <Date {...args} selected={true} hasContents={true} />
      <Date {...args} selected={false} />
    </div>
  ),
};
