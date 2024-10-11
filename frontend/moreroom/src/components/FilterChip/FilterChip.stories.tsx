import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip } from '.';
import { ColorScale, FontWeight, Palette } from '../../types/globalStyleTypes';
import { bool } from 'prop-types';
import { MainColors } from '../Typography/Typography.stories';
import { Colors } from '../../styles/globalStyle';

const meta = {
  title: 'UI/Components/FilterChip',
  component: FilterChip,
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
      description: 'FilterChip 에 표시할 내용입니다',
    },
    color: {
      description: '표시할 색상입니다',
    },
    size: {
      description: '폰트의 크기입니다',
    },
    rounded: {
      description: '둥근 정도입니다',
    },
    selected: {
      description: '선택 여부입니다',
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Primary: Story = {
  args: {
    children: 'FilterChip',
    color: 'primary',
    size: 0.875,
    rounded: true,
    selected: true,
  },
};

const colors: Palette[] = ['primary', 'secondary', 'danger', 'grey', 'dark'];
const sizes: number[] = [0.625, 0.75, 0.875, 1];

export const ChipColors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <FilterChip {...args} selected={false}>
          default
        </FilterChip>
        <FilterChip {...args} rounded={false} selected={false}>
          default
        </FilterChip>
      </div>
      {colors.map((color: Palette) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <FilterChip {...args} color={color}>
            {color}
          </FilterChip>
          <FilterChip {...args} color={color} rounded={false}>
            {color}
          </FilterChip>
        </div>
      ))}
    </div>
  ),
};

export const ChipSizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {sizes.map((size: number) => (
          <FilterChip {...args} size={size} selected={false}>
            {size}rem
          </FilterChip>
        ))}
      </div>
      {colors.map((color: Palette) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {sizes.map((size: number) => (
            <FilterChip {...args} color={color} size={size}>
              {size}rem
            </FilterChip>
          ))}
        </div>
      ))}
    </div>
  ),
};
