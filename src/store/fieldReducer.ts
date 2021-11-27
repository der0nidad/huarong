import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Figure } from '../types/types';
import { fieldChunk, figures } from '../constants';

export interface FieldState {
  width: number;
  height: number;
  figures: Figure[];
}

const initialState: FieldState = {
  width: 4 * fieldChunk,
  height: 5 * fieldChunk,
  figures: figures,
};

export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    moveFigure: (state) => {
      // move some figures here!
    },
    setFigure: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { moveFigure, setFigure } = fieldSlice.actions;

export default fieldSlice.reducer;
