/** @jsxImportSource @emotion/react */
import React from 'react';
import { IChatListItem } from '../../../../types/chatingTypes';
import { Typography } from '../../../../components/Typography';
import { bubble, container, profile } from './styles';

interface ChatBubbleProps {
  isMine: boolean;
  chat: IChatListItem;
}

export const ChatBubble = ({ isMine, chat }: ChatBubbleProps) => {
  return (
    <div css={container(isMine)}>
      {isMine ? (
        <div css={bubble(isMine)}>
          <Typography color="light" weight={500} size={0.875}>
            {chat.message}
          </Typography>
        </div>
      ) : (
        <>
          <img src={`/profiles/profile${chat.photo}.png`} css={profile} />
          <div>
            <Typography color="light" weight={400} size={0.75}>
              {chat.nickname}
            </Typography>
            <div css={bubble(isMine)}>
              <Typography color="dark" weight={500} size={0.875}>
                {chat.message}
              </Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
