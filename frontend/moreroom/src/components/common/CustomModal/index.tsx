/** @jsxImportSource @emotion/react */
import React from 'react';
import { NotificationProps } from './types';
import { base, btnContainerCss, btnCss, modalContent } from './styles';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import { Backdrop } from '../../Backdrop';

export const CustomModal = ({
  ment,
  type,
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
        <div css={modalContent}>{ment}</div>
        <div css={btnContainerCss}>
          {twoBtn ? (
            <>
              <Button
                handler={handler}
                color={type === 'confirm' ? 'primary' : 'danger'}
                rounded={0.5}
              >
                <Typography color="light" weight={600} size={0.875}>
                  {children[0]}
                </Typography>
              </Button>
              <Button
                handler={outlinedHandler}
                variant="outlined"
                color={type === 'confirm' ? 'primary' : 'danger'}
                rounded={0.5}
              >
                <Typography color="primary" weight={600} size={0.875}>
                  {children[1]}
                </Typography>
              </Button>
            </>
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
      </div>
    </Backdrop>
  );
};