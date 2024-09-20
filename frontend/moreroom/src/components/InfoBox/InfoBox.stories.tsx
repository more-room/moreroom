import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InfoBox } from '.';
import { ColorScale, Palette } from '../../types/globalStyleTypes';
import { ClockIcon, UserIcon } from '@heroicons/react/24/solid';

const meta = {
  title: 'UI/Components/InfoBox',
  component: InfoBox,
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
      description: '텍스트를 입력해주세요',
    },
    color: {
      description: '적용할 컬러입니다.\n기본 색상은 primary 입니다.',
    },
    colorScale: {
      description:
        '적용할 컬러스케일입니다.\n입력되지 않으면 MainColor가 적용됩니다.',
    },
    size: {
      description: '적용할 사이즈입니다.\nrem 단위로 입력하면 됩니다.',
    },
    icon: {
      description: '사용할 아이콘의 이름을 입력하세요. 예: ClockIcon, UserIcon 등',
      control: { type: 'text' },  // 텍스트 입력 가능
    },
  },
} satisfies Meta<typeof InfoBox>;

export default meta;

type Story = StoryObj<typeof InfoBox>;

const colors: Palette[] = [
  'primary',
  'secondary',
  'danger',
  'grey',
  'dark',
  'light',
];

const scales: ColorScale[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'A100',
  'A200',
  'A400',
  'A700',
];

const icons: ReactNode[] = [<ClockIcon/>, <UserIcon/>]

export const Primary: Story = {
  args: {
    children: '09월 08일15:00',
    color: 'primary',
    size: 1.5,
    fontSize: 1,
    borderRadius: 0.8,
    icon: <ClockIcon/>
  },
};

export const MainColorsInfoBox: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <InfoBox key={color} {...args} color={color}>
          {color}
        </InfoBox>
      ))}
    </div>
  ),
};

export const ColorsWithScales: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div>
      {colors.map((color) => (
        <div
          key={color}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
        >
          {color != 'dark' &&
            color != 'light' &&
            scales.map((scale) => (
              <InfoBox key={scale} style={{ marginBottom: '1rem' }} {...args} color={color} colorScale={scale}>
                {scale}
              </InfoBox>
            ))}
        </div>
      ))}
    </div>
  ),
};

export const InfoBoxIcon: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {icons.map((icon) => (
        <InfoBox key={icon?.toString()} {...args} icon={icon}>
          
        </InfoBox>
      ))}
    </div>
  ),
}