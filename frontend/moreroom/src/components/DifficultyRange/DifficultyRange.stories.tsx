import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DifficultyRange } from '.';
import { TDifficultySize, TDiffilcultyDir } from './DifficultyRange.types';

const meta = {
  title: 'UI/Components/DifficultyRange',
  component: DifficultyRange,
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
    difficulty: {
      description: '난이도입니다',
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 1,
      },
    },
    dir: {
      description: '표시될 방향입니다 (row=가로, col=세로)',
    },
    size: {
      description: '적용할 크기입니다',
    },
  },
} satisfies Meta<typeof DifficultyRange>;

export default meta;

type Story = StoryObj<typeof DifficultyRange>;

export const Primary: Story = {
  args: {
    difficulty: 1,
    dir: 'row',
    size: 'md',
  },
};

const difficulties: number[] = [1, 2, 3, 4, 5];
const dirs: TDiffilcultyDir[] = ['row', 'col'];
const sizes: TDifficultySize[] = ['sm', 'md', 'lg'];

export const ClickEvent: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => {
    const [difficulty, setDifficulty] = useState<number>(1);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <DifficultyRange
          {...args}
          difficulty={difficulty}
          handler={setDifficulty}
        />
        <DifficultyRange
          {...args}
          difficulty={difficulty}
          dir="col"
          handler={setDifficulty}
        />
      </div>
    );
  },
};

export const Difficulties: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {difficulties.map((difficulty) => (
        <DifficultyRange key={difficulty} {...args} difficulty={difficulty} />
      ))}
    </div>
  ),
};

export const Dirs: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {dirs.map((dir) => (
        <DifficultyRange key={dir} {...args} dir={dir} difficulty={5} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((size) => (
        <DifficultyRange key={size} {...args} size={size} difficulty={5} />
      ))}
    </div>
  ),
};
