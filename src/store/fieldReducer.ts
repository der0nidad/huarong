import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FigureData, Point } from '../types/types';
import { fieldChunk, figuresObj } from '../constants';

export interface FieldState {
  width: number;
  height: number;
  figures: Record<string, FigureData>;
}

export interface MoveFigureActionPayload {
  figureId: string;
  newPos: Point;
}
const initialState: FieldState = {
  width: 4 * fieldChunk,
  height: 5 * fieldChunk,
  figures: figuresObj,
};

export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    moveFigure: (state, action: PayloadAction<MoveFigureActionPayload>) => {
      const figure = state.figures[action.payload.figureId];
      figure.plt.x = action.payload.newPos.x;
      figure.plt.y = action.payload.newPos.y;
    },
    setFigure: (state) => {},
    delFigure: (state, action: PayloadAction<string>) => {
      delete figuresObj[action.payload];
    },
  },
});

export const { moveFigure, setFigure, delFigure } = fieldSlice.actions;

export default fieldSlice.reducer;
