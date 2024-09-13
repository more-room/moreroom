import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MenuTab } from '.';
import { MenuTabProps } from './MenuTab.types';
import { Palette } from '../../types/globalStyleTypes';


const meta = {
  title: 'UI/Components/MenuTab',
  component: MenuTab,
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
    size: {
      description: 'MenuTab의 크기입니다.',
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    color: {
      description: '선택된 버튼의 색입니다.',
      control: { type: 'select', options: ['primary', 'secondary', 'default'] },
    },
    children: {
      description: 'Tab의 갯수입니다.',
      control: { type: 'object' },
    },
    variant: {
      description: 'MenuTab의 스타일입니다.',
    },
    border: {
      description: '테두리의 둥근 정도입니다.',
    }
  },
} satisfies Meta<typeof MenuTab>;

export default meta;

type Story = StoryObj<typeof MenuTab>;

const Template: StoryObj<MenuTabProps> = {
  render: (args) => (
    <MenuTab {...args}>
      {args.children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </MenuTab>
  ),
};

export const Primary = {
  ...Template,
  args: {
    size: 'md',
    color: 'primary',
    children: ['Tab1', 'Tab2', 'Tab3'],
    variant: 'contained',
    border: 0
  },
};