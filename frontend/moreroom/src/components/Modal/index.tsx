/** @jsxImportSource @emotion/react */
import React from 'react';
import { ModalProps } from './Modal.types';
import { base } from './Modal.styles';
import { Backdrop } from '../Backdrop';

export const Modal = ({ height = 60, children, ...props }: ModalProps) => {
  return (
    <Backdrop
      style={{
        display: 'flex',
        alignItems: 'end',
      }}
    >
      <div css={base(height)} {...props}>
        {children}
      </div>
    </Backdrop>
  );
};
