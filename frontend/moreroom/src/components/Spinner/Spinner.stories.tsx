import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '.';

const meta = {
  title: 'UI/Components/Spinner',
  component: Spinner,
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
      description: '스피너의 크기입니다.',
    },
    color: {
      description: '스피너의 색상입니다.',
    },
    scale: {
      description: '스피너의 색상 스케일입니다.',
    }
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    size: 'md',
    color: 'primary',
    scale: '700',
  },
};
