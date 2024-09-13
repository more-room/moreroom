/** @jsxImportSource @emotion/react */
import React from 'react';
import { NotificationProps } from './Notification.types';
import { Backdrop } from '../Backdrop';
import { base, btnCss } from './Notification.styles';
import { Typography } from '../Typography';
import { Button } from '../Button';

export const Notification = ({
  ment,
  type,
  handler,
  children,
  ...props
}: NotificationProps) => {
  return (
    <Backdrop
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      <div css={base}>
        <Typography color="light" size={1} weight={500}>
          {ment}
        </Typography>
        <Button
          css={btnCss}
          handler={handler}
          color={type === 'confirm' ? 'primary' : 'danger'}
          rounded={0.5}
        >
          <Typography color="light" weight={600} size={0.875}>
            확인
          </Typography>
        </Button>
      </div>
      {children}
    </Backdrop>
  );
};
