/** @jsxImportSource @emotion/react */
import React from 'react';
import { NotificationProps } from './Notification.types';
import { Backdrop } from '../Backdrop';
import { base, btnContainerCss, btnCss } from './Notification.styles';
import { Typography } from '../Typography';
import { Button } from '../Button';

export const Notification = ({
  ment,
  type,
  twoBtn,
  handler,
  outlinedHandler = () => {},
  children=['확인하기', '취소하기'],
  ...props
}: NotificationProps) => {
  return (
    <Backdrop
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div css={base} {...props}>
        <Typography color="light" size={1} weight={500}>
          {ment}
        </Typography>
        {twoBtn ? (
          <div css={btnContainerCss}>
            <Button
              handler={handler}
              fullwidth
              color={type === 'confirm' ? 'primary' : 'danger'}
              rounded={0.5}
            >
              <Typography color="light" weight={600} size={0.875}>
                {children[0]}
              </Typography>
            </Button>
            <Button
              handler={outlinedHandler}
              fullwidth
              variant="outlined"
              color={type === 'confirm' ? 'primary' : 'danger'}
              rounded={0.5}
            >
              <Typography color="primary" weight={600} size={0.875}>
                {children[1]}
              </Typography>
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    </Backdrop>
  );
};
