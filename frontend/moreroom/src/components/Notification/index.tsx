/** @jsxImportSource @emotion/react */
import React from 'react';
import { NotificationProps } from './Notification.types';
import { Backdrop } from '../Backdrop';
import { base, btnContainerCss, btnCss } from './Notification.styles';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Right } from '../TopBar/Right';

export const Notification = ({
  ment,
  type,
  xbtn,
  twoBtn,
  handler,
  xhandler,
  outlinedHandler = () => {},
  children = ['확인하기', '취소하기'],
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
        {xbtn ? (
          <div onClick={xhandler} style={{ position: 'absolute', right: '0', margin: '0 1.5rem' }}>
            <Icon color="light" size={1.5}>
              <XMarkIcon />
            </Icon>
          </div>
        ) : undefined}

        <div style={xbtn ? { margin: '1.5em 0' } : undefined}>
          <Typography color="light" size={1} weight={500}>
            {ment}
          </Typography>
        </div>
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
