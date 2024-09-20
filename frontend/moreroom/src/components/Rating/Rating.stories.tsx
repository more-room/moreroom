import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Rating from '.';
import { Palette } from '../../types/globalStyleTypes';

const meta = {
  title: 'UI/Components/Rating',
  component: Rating,
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
    count: {
      description: '최대 점수입니다.',
    },
    value: {
      description: '현재 점수입니다.',
    },
    size: {
      description: '별 사이즈 입니다. \n rem 단위로 설정됩니다..',
    },
    activeColor: {
      description: '활성화 되었을 때 별 색깔 입니다.',
    },
    transparentBackground: {
      description:
        '비활성화 되었을 떄 배경색입니다. \n투명과 진한 회색이 있습니다.',
    },
    disabled: {
      description:
        '드래그 이벤트 발생 여부입니다. true로 설정 시 오직 value값으로만 설정이 가능합니다.',
    },
    onChange: {
      description: '별점을 드래그했을 때의 핸들러 함수입니다.',
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof Rating>;

export const Primary: Story = {
  args: {
    count: 5,
    value: 3,
    size: 1.5,
    activeColor: 'primary',
    transparentBackground: false,
    disabled: false,
  },
};

const colors: Palette[] = [
  'primary',
  'secondary',
  'danger',
  'grey',
  'dark',
  'light',
];

export const Colors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <Rating key={color} {...args} activeColor={color} />
      ))}
    </div>
  ),
};

const transparentBackgrounds: boolean[] = [false, true];

export const TransparentBackground: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {transparentBackgrounds.map((transparentBackground) => (
        <Rating
          key={transparentBackground.toString()}
          {...args}
          transparentBackground={transparentBackground}
        />
      ))}
    </div>
  ),
};

const sizes: number[] = [0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25, 1.5];

export const Sizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((size) => (
        <div>
          <Rating key={size}  {...args} size={size} />
          <div>{size}</div>
        </div>
      ))}
    </div>
  ),
};
