/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { container } from './styles';
import { Button } from '../../../components/Button';
import { useModal } from '../../../hooks/useModal';
import { useHistoryWriteStore } from '../../../stores/historyStore';
import { Types } from './Types';
import { HintCount } from './HintCount';
import { MemberLevel } from './MemberLevel';
import { MemberPlayTime } from './MemberPlayTime';
import { Players } from './Players';
import { SuccessFlag } from './SuccessFlag';
import { Price } from './Price';
import { Date } from './Date';

export interface HistoryTypesProps {
  type: string;
}

export const HistoryTypes = ({ type }: HistoryTypesProps) => {
  const historyWriteStore = useHistoryWriteStore();
  const modal = useModal();
  const [curType, setCurType] = useState<string>(type);

  const handler = (filter: string) => setCurType(filter);
  const clickHandler = () => {
    console.log(historyWriteStore);
    modal.hide();
  };

  return (
    <div css={container}>
      <Types selected={curType} handler={handler} />
      {curType === 'date' && <Date />}
      {curType === 'hintCount' && <HintCount />}
      {curType === 'memberLevel' && <MemberLevel />}
      {curType === 'memberPlayTime' && <MemberPlayTime />}
      {curType === 'players' && <Players />}
      {curType === 'price' && <Price />}
      {curType === 'successFlag' && <SuccessFlag />}
      <Button rounded={0.5} handler={clickHandler}>
        적용하기
      </Button>
    </div>
  );
};
