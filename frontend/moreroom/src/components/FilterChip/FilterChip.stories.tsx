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
      description: 'text를 입력해주세요',
    },
    // color: {
    //   description: '글자 색상입니다.\n기본 색상은 grey 입니다.',
    // },
    // fill: {
    //   description: '배경 색상입니다. \n기본 색상은 secondary 입니다.',
    // },
    scale: {
      description:
        '적용할 컬러 스케일입니다.\n입력되지 않으면 MainColor가 적용됩니다.',
    },
    size: {
      description: '적용할 사이즈입니다.\nrem 단위로 입력하면 됩니다.',
    },
    weight: {
      description: '적용할 굵기입니다.',
    },
    selected: {
      description: '선택 여부 입니다.'
    },
    border: {
      description: '적용할 테두리 굵기 입니다.'
    },
    borderRadius: {
      description: '적용할 테두리 굴곡 입니다.'
    }
  },
} satisfies Meta<typeof FilterChip>;

export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Primary: Story = {
  args: {
    children: 'text',
    // color: 'grey',
    // fill: 'secondary',
    size: 1,
    weight: 400,
    selected: false
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
const sizes: number[] = [0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25];
const borderradius: number[] = [0.5, 1]

export const MainColorsFilterChip: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
     <FilterChip {...args} selected={false}>
        {`기본값 (미선택)`}
      </FilterChip>

      
      <FilterChip {...args} selected={true}>
        {`선택 시 (선택)`}
      </FilterChip>
    </div>
  ),
};

export const FilterChipSizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((size) => (
        <FilterChip key={size} {...args} size={size}>
          {size}rem
        </FilterChip>
      ))}
    </div>
  ),
};

export const borderRadius: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {borderradius.map((border) => (
        <FilterChip key={border} {...args} borderRadius={border}>
          {border}rem
        </FilterChip>
      ))}
    </div>
  )
}

export const FilterChipSizeVariants: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((size) => (
        <FilterChip
          key={size}
          {...args}
          size={size} // size를 전달하여 크기를 변경
          style={{
            fontSize: `${size}rem`, // size에 따라 글자 크기 설정
            padding: `${size * 0.5}rem ${size}rem`, // 패딩을 size에 따라 동적으로 설정
            borderRadius: `1rem`, // borderRadius 고정
            lineHeight: '1', // 텍스트가 중앙에 오도록 줄 높이 설정
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: `${size * 2}rem`, // 버튼 높이를 size에 비례하여 조정
            width: `${size * 4}rem`, // 버튼 너비를 size에 비례하여 조정
          }}
        >
          {size}
        </FilterChip>
      ))}
    </div>
  ),
};

