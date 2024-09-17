import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Rating from '.';

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
      description: '비활성화 되었을 떄 배경색입니다. \n투명과 진한 회색이 있습니다.',
    },
    disabled: {
      description: '드래그 이벤트 발생 여부입니다. true로 설정 시 오직 value값으로만 설정이 가능합니다.',
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
    value: 0,

  },
};
