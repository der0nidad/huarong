/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Figure from './Figure';

const Field = () => {
  const figures = useSelector((state: RootState) => state.field.figures);
  const field = useSelector((state: RootState) => state.field);
  const { width, height } = field;
  return (
    <div
      css={{
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${height}px`,
        position: 'fixed',
        border: '1px solid green',
      }}>
      {figures.map((fig, index) => (
        <Figure figure={fig} key={index} />
      ))}
    </div>
  );
};

export default Field;
