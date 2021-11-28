import { FigureData, FigureType } from './types/types';

export const fieldChunk = 100;

export const smallFigure1: FigureData = {
  id: '1',
  type: FigureType.Small,
  plt: { x: 0, y: 4 * fieldChunk },
  prb: { x: 1 * fieldChunk, y: 5 * fieldChunk },
  width: fieldChunk,
  height: fieldChunk,
};
export const smallFigure2: FigureData = {
  id: '2',
  type: FigureType.Small,
  plt: { x: 1 * fieldChunk, y: 3 * fieldChunk },
  prb: { x: 2 * fieldChunk, y: 4 * fieldChunk },
  width: fieldChunk,
  height: fieldChunk,
};
export const smallFigure3: FigureData = {
  id: '3',
  type: FigureType.Small,
  plt: { x: 2 * fieldChunk, y: 3 * fieldChunk },
  prb: { x: 3 * fieldChunk, y: 4 * fieldChunk },
  width: fieldChunk,
  height: fieldChunk,
};
export const smallFigure4: FigureData = {
  id: '4',
  type: FigureType.Small,
  plt: { x: 3 * fieldChunk, y: 4 * fieldChunk },
  prb: { x: 4 * fieldChunk, y: 5 * fieldChunk },
  width: fieldChunk,
  height: fieldChunk,
};
export const tallFigure1: FigureData = {
  id: '5',
  type: FigureType.Tall,
  plt: { x: 0, y: 0 },
  prb: { x: 1 * fieldChunk, y: 2 * fieldChunk },
  width: fieldChunk,
  height: 2 * fieldChunk,
};
export const tallFigure2: FigureData = {
  id: '6',
  type: FigureType.Tall,
  plt: { x: 3 * fieldChunk, y: 0 },
  prb: { x: 4 * fieldChunk, y: 2 * fieldChunk },
  width: fieldChunk,
  height: 2 * fieldChunk,
};
export const tallFigure3: FigureData = {
  id: '7',
  type: FigureType.Tall,
  plt: { x: 0, y: 2 * fieldChunk },
  prb: { x: 1 * fieldChunk, y: 4 * fieldChunk },
  width: fieldChunk,
  height: 2 * fieldChunk,
};
export const tallFigure4: FigureData = {
  id: '8',
  type: FigureType.Tall,
  plt: { x: 3 * fieldChunk, y: 2 * fieldChunk },
  prb: { x: 4 * fieldChunk, y: 4 * fieldChunk },
  width: fieldChunk,
  height: 2 * fieldChunk,
};
export const wideFigure1: FigureData = {
  id: '9',
  type: FigureType.Wide,
  plt: { x: 1 * fieldChunk, y: 2 * fieldChunk },
  prb: { x: 3 * fieldChunk, y: 3 * fieldChunk },
  width: 2 * fieldChunk,
  height: fieldChunk,
};

export const bigFigure: FigureData = {
  id: '10',
  type: FigureType.Big,
  plt: { x: 1 * fieldChunk, y: 0 },
  prb: { x: 3 * fieldChunk, y: 2 * fieldChunk },
  width: 2 * fieldChunk,
  height: 2 * fieldChunk,
};

// may be move to store?
export const figures = [
  smallFigure1,
  smallFigure2,
  smallFigure3,
  smallFigure4,
  tallFigure1,
  tallFigure2,
  tallFigure3,
  tallFigure4,
  wideFigure1,
  bigFigure,
];

export const figuresObj: Record<string, FigureData> = figures.reduce(
  (prev, curr) => ({
    ...prev,
    [curr.id]: curr,
  }),
  {}
);
