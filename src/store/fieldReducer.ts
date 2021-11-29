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

const b = 1;
export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    moveFigure: (state, action: PayloadAction<MoveFigureActionPayload>) => {
      const figure = state.figures[action.payload.figureId];

      const newLTX = action.payload.newPos.x;
      const newLTY = action.payload.newPos.y;
      const newRBX = newLTX + figure.width;
      const newRBY = newLTY + figure.height;
      const collisions = Object.values(state.figures).filter((fig) => {
        if (fig.id === action.payload.figureId) return false;
        // console.log(
        //   newLTX,
        //   newLTY,
        //   newRBX,
        //   newRBY,
        //   fig.id,
        //   fig.plt.x,
        //   fig.plt.y,
        //   fig.prb.x,
        //   fig.prb.y,
        //   newLTX >= fig.plt.x && newLTX <= fig.prb.x && newLTY >= fig.plt.y && newLTY <= fig.prb.y,
        //   newRBX >= fig.plt.x && newRBX <= fig.prb.x && newLTY >= fig.plt.y && newLTY <= fig.prb.y,
        //   newRBX >= fig.plt.x && newRBX <= fig.prb.x && newRBY >= fig.plt.y && newRBY <= fig.prb.y,
        //   newLTX >= fig.plt.x && newLTX <= fig.prb.x && newRBY >= fig.plt.y && newRBY <= fig.prb.y
        // );
        // console.log(
        //   (newLTX > fig.plt.x + b &&
        //     newLTX < fig.prb.x - b &&
        //     newLTY > fig.plt.y + b &&
        //     newLTY < fig.prb.y - b) ||
        //     (newRBX > fig.plt.x + b &&
        //       newRBX < fig.prb.x - b &&
        //       newLTY > fig.plt.y + b &&
        //       newLTY < fig.prb.y - b) ||
        //     (newRBX > fig.plt.x + b &&
        //       newRBX < fig.prb.x - b &&
        //       newRBY > fig.plt.y + b &&
        //       newRBY < fig.prb.y - b) ||
        //     (newLTX > fig.plt.x + b &&
        //       newLTX < fig.prb.x - b &&
        //       newRBY > fig.plt.y + b &&
        //       newRBY < fig.prb.y - b)
        // );
        return (
          (newLTX > fig.plt.x + b &&
            newLTX < fig.prb.x - b &&
            newLTY > fig.plt.y + b &&
            newLTY < fig.prb.y - b) ||
          (newRBX > fig.plt.x + b &&
            newRBX < fig.prb.x - b &&
            newLTY > fig.plt.y + b &&
            newLTY < fig.prb.y - b) ||
          (newRBX > fig.plt.x + b &&
            newRBX < fig.prb.x - b &&
            newRBY > fig.plt.y + b &&
            newRBY < fig.prb.y - b) ||
          (newLTX > fig.plt.x + b &&
            newLTX < fig.prb.x - b &&
            newRBY > fig.plt.y + b &&
            newRBY < fig.prb.y - b)
        );
        //return (
        //           (newLTX > fig.plt.x + b && newLTX < fig.prb.x - b && newLTY > fig.plt.y + b && newLTY < fig.prb.y - b) ||
        //           (newRBX > fig.plt.x + b && newRBX < fig.prb.x - b && newLTY > fig.plt.y + b && newLTY < fig.prb.y - b) ||
        //           (newRBX > fig.plt.x + b && newRBX < fig.prb.x - b && newRBY > fig.plt.y + b && newRBY < fig.prb.y - b) ||
        //           (newLTX > fig.plt.x + b && newLTX < fig.prb.x - b && newRBY > fig.plt.y + b && newRBY < fig.prb.y - b)
        //         );
      });
      if (collisions.length) {
        [collisions[0]].forEach((fig) => {
          console.log(
            '--',
            newLTX > fig.plt.x + b && newLTX < fig.prb.x - b,
            newRBX > fig.plt.x + b && newRBX < fig.prb.x - b,
            newLTY < fig.prb.y - b && newLTY > fig.plt.y + b,
            newRBY < fig.prb.y - b && newRBY > fig.plt.y + b
          );
          if (
            newLTX > fig.plt.x + b &&
            newLTX < fig.prb.x - b &&
            newLTY < fig.prb.y - b &&
            newLTY > fig.plt.y + b
          ) {
            // справа или снизу
            console.log('col1', fig.prb.x - newLTX < fig.prb.y - newLTY);
            if (fig.prb.x - newLTX < fig.prb.y - newLTY) {
              // справа
              figure.plt.x = Math.max(newLTX, fig.prb.x);
              figure.prb.x = figure.plt.x + figure.width;
            } else {
              // снизу
              figure.plt.y = Math.max(newLTY, fig.prb.y);
              figure.prb.y = figure.plt.y + figure.height;
            }
          } else if (newLTX < fig.prb.x - b && newRBY < fig.plt.y - b) {
            // сверху
            console.log('сверху');
            figure.prb.y = Math.min(newRBY, fig.plt.y);
            figure.plt.y = figure.prb.y - figure.height;
          } else if (
            newLTY < fig.prb.y - b &&
            newLTY > fig.plt.y + b &&
            newRBX < fig.prb.x - b &&
            newRBX > fig.plt.x + b
          ) {
            console.log(
              'col3',
              newRBX - fig.plt.x < fig.prb.y - newLTY,
              newRBX - fig.plt.x,
              fig.prb.y - newLTY
            );
            if (newRBX - fig.plt.x < fig.prb.y - newLTY) {
              // слева
              figure.prb.x = Math.min(newRBX, fig.plt.x);
              figure.plt.x = figure.prb.x - figure.width;
            } else {
              // снизу
              figure.plt.y = Math.max(newLTY, fig.prb.y);
              figure.prb.y = figure.plt.y + figure.height;
            }

            figure.plt.y = Math.max(newLTY, fig.prb.y);
            figure.prb.y = figure.plt.y + figure.height;
          } else if (newRBX > fig.plt.x + b && newRBX < fig.prb.x - b && newLTY < fig.prb.y - b) {
            console.log('col2');
            figure.prb.x = Math.min(newRBX, fig.plt.x);
            figure.plt.x = figure.prb.x - figure.width;
          } else if (newRBY < fig.prb.y - b && newRBY > fig.plt.y + b && newLTX < fig.prb.x - b) {
            // сверху
            console.log('col4');
            figure.prb.y = Math.min(newRBY, fig.plt.y);
            figure.plt.y = figure.plt.y - figure.height;
          }
        });
        // const colEl = collisions[0];
        // console.log(
        //   'coll',
        //   collisions.forEach((e) => console.log(e.id))
        // );
        // если коллизя слева
        // figure.plt.x = Math.max(newLTX, colEl.prb.x);
        // figure.plt.y = Math.min(newLTY, colEl.prb.y);
        //
        // // если коллизия справа
        // figure.prb.x = Math.min(newRBX, colEl.plt.x);
        // figure.prb.y = Math.min(newRBY, colEl.plt.y);
      } else {
        figure.plt.x = newLTX;
        figure.plt.y = newLTY;
        figure.prb.x = newRBX;
        figure.prb.y = newRBY;
      }
    },
    setFigure: (state) => {},
    delFigure: (state, action: PayloadAction<string>) => {
      delete figuresObj[action.payload];
    },
    flushState: (state) => {
      state = initialState;
    },
  },
});

export const { moveFigure, setFigure, delFigure, flushState } = fieldSlice.actions;

export default fieldSlice.reducer;
