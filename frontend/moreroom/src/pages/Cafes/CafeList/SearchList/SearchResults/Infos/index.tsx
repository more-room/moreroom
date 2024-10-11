/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { ICafeListItem } from '../../../../../../types/cafeTypes';
import { CafeItem } from '../../../../../../components/CafeItem';
import { useSearchNameStore } from '../../../../../../stores/cafeStore';
import { Typography } from '../../../../../../components/Typography';
import { box, btn, container } from './styles';
import { useMap } from 'react-kakao-maps-sdk';

interface InfosProps {
  cafeList: ICafeListItem[];
  selected: number;
  handler: (selected: number) => void;
}

export const Infos = ({ cafeList, selected, handler }: InfosProps) => {
  const map = useMap();
  const searchNameStore = useSearchNameStore();
  const [onList, setOnList] = useState<boolean>(false);
  const handleOnList = () => setOnList((prev) => !prev);

  return (
    <div css={container(onList)}>
      <button css={btn} onClick={handleOnList}>
        <Typography color="light" weight={400} size={0.75}>
          {cafeList.length ? (onList ? '지도보기' : '목록보기') : '카페 없음'}
        </Typography>
      </button>
      <div css={box(onList)}>
        {cafeList.length ? (
          <>
            {!onList ? (
              <CafeItem
                cafe={cafeList[selected]}
                onList={onList}
                pattern={searchNameStore.cafeName}
              />
            ) : (
              <>
                {cafeList.map((cafe: ICafeListItem, idx: number) => {
                  return (
                    <CafeItem
                      cafe={cafe}
                      onList={onList}
                      pattern={searchNameStore.cafeName}
                      onClick={() => {
                        handler(idx);
                        handleOnList();
                        map.setLevel(1);
                      }}
                    />
                  );
                })}
              </>
            )}
          </>
        ) : (
          <Typography
            color="light"
            size={1.125}
            weight={500}
            style={{ textAlign: 'center', padding: '1rem' }}
          >
            해당 지역에 카페가 없습니다
          </Typography>
        )}
      </div>
    </div>
  );
};
