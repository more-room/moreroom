import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta = {
  title: 'UI/Components',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  // decorators: [
  //   (Story) => (
  //     <div style={{ padding: '1rem' }}>
  //       <Story />
  //     </div>
  //   ),
  // ],
  tags: ['!autodocs'],
  argTypes: {
    children: {
      description: '버튼 안에 표시할 텍스트입니다.',
    },
    variant: {
      description: '버튼의 스타일입니다.',
    },
    color: {
      description: '적용할 컬러 팔레트입니다.',
    },
    disabled: {
      description: '버튼의 비활성화 여부입니다.',
    },
    fullWidth: {
      description: '`width`를 상위 노드의 크기에 맞출지 여부입니다.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;