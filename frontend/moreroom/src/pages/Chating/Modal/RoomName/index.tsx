/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { container, input, inputbox } from './styles';
import { Typography } from '../../../../components/Typography';

export const RoomName = ({
  roomname,
  onhandler,
}: {
  roomname: string;
  onhandler: (newRoomName: string) => void;
}) => {
  const [newRoomName, setNewRoomName] = useState<string>(roomname);

  return (
    <div css={container}>
      <Typography color="light" size={1} weight={400}>
        새로운 채팅방의 이름을 입력해주세요
      </Typography>
      <div css={inputbox}>
        <input
          value={newRoomName}
          css={input}
          type="text"
          onChange={(e) => { setNewRoomName(e.target.value); onhandler(e.target.value)}}
        />
      </div>
    </div>
  );
};
