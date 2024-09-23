import React, { useState } from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeRecommend } from ".";
import { IThemeListItem } from "../../types/themeTypes";

const meta = {
  title: 'UI/Components/ThemeRecommend',
  component: ThemeRecommend,
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
    theme: {
      description: '',
    },
    pattern: {
      description:
        '검색 키워드입니다.',
    },
  },
} satisfies Meta<typeof ThemeRecommend>;

export default meta;

type Story = StoryObj<typeof ThemeRecommend>;

// export const Primary: Story = {
//   args: {pattern:''},
//   render: () => {
//     const [themeList, setThemeList] = useState<IThemeListItem>({
//       themeList: [
//         {
//           poster: '/posters/heaven.png',
//           title: 'HEAVEN',
//           genrename: '스릴러',
//           playtime: 60,
//           reviewCount: 127,
//           brandName: '넥스트 에디션',
//           branchName: '건대2호점',
//         },
//       ],
//     });
//     return (
//       <div style={{ width: '328px' }}>
//         <ThemeRecommend theme={themeList.themeList[0]}/>
//       </div>
//     );
//   },
// };

export const Primary: Story = {
  args: {pattern:''},
  render: () => {
    const [themeList, setThemeList] = useState<IThemeListItem>({
      themeId: 1,
      title: 'Bad Rob Bad',
      poster: '/posters/badrobbad.png',
      playtime: 80,
      genreList: ['스토리', '드라마'],
      regionId: '111000000',
      review: {
        count: 10,
        score: 4.5,
      },
      cafe: {
        cafeId: 34,
        brandName: '제로월드',
        branchName: '강남점',
        cafeName: '제로월드 강남점',
        address: '주소',
      },
      member: {
        playFlag: true,
      },
    });
    return (
      <div style={{ width: '328px' }}>
        <ThemeRecommend theme={themeList}/>
      </div>
    );
  },
};