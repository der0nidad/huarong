/** @jsxImportSource @emotion/react */
import React from 'react';
import { FigureData } from '../types/types';

export interface FigureProps {
  figure: FigureData;
}
const Figure: React.VFC<FigureProps> = ({ figure }) => {
  return (
    <div
      css={{
        backgroundColor: 'hotpink',
        '&:hover': {
          color: 'lightgreen',
        },
        width: `${figure.width}px`,
        height: `${figure.height}px`,
        border: '1px solid black',
        position: 'absolute',
        overflow: 'hidden',
        wordBreak: 'break-all',
        top: `${figure.plt.y}px`,
        left: `${figure.plt.x}px`,
      }}>
      {JSON.stringify(figure)}
    </div>
  );
};

export default Figure;
