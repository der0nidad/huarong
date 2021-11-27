import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Field } from '../types/types';

export interface GameState {
  win: boolean;
  field?: Field;
}

const initialState: GameState = {
  win: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setVictory: (state) => {
      state.win = true;
    },
  },
});

export const { setVictory } = gameSlice.actions;

export default gameSlice.reducer;
