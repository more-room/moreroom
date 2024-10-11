/** @jsxImportSource @emotion/react */
import React from 'react';
import { typeContainer } from './styles';
import { Typography } from '../../../../components/Typography';
import { typeToKor, typeToMent } from '../../../../types/historyTypes';

export interface TypesProps {
  selected: string;
  handler: (filter: string) => void;
}

export const Types = ({ selected, handler }: TypesProps) => {
  return (
    <>
      <div css={typeContainer}>
        {Object.keys(typeToKor).map((eng: string) => (
          <Typography
            key={eng}
            size={0.875}
            color={selected === eng ? 'light' : 'grey'}
            weight={selected === eng ? 600 : 400}
            onClick={() => handler(eng)}
          >
            {typeToKor[eng]}
          </Typography>
        ))}
      </div>
      <Typography
        color="light"
        size={0.875}
        weight={600}
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        {typeToMent[selected]}
      </Typography>
    </>
  );
};
