/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Figure from './Figure';
import { FigureData } from '../types/types';
import { moveFigure } from '../store/fieldReducer';

type ShiftData = {
  shiftX: number;
  shiftY: number;
};

const dragStub = () => false;
const Field = () => {
  const figures = useSelector((state: RootState) => state.field.figures);
  const field = useSelector((state: RootState) => state.field);
  const { width, height } = field;
  const [currentDragFig, setDragFig] = useState<FigureData | null>(null);
  const dispatch = useDispatch();
  const shift = useRef<ShiftData>({ shiftX: 0, shiftY: 0 });

  const handleMouseDown = (figure: FigureData) => (event: React.MouseEvent<HTMLElement>) => {
    setDragFig(figure);
    console.log('mouse down event', figure, event);
    const figEl = document.getElementById(`${figure.id}`);
    const figRect = figEl?.getBoundingClientRect();
    const shiftX = event.clientX - (figRect?.left || 0);
    const shiftY = event.clientY - (figRect?.top || 0);
    shift.current = { shiftX, shiftY };
  };

  const handleMouseUp = (figure: FigureData) => (event: React.MouseEvent<HTMLElement>) => {
    setDragFig(null);
    console.log('mouse up event', figure, event);
  };
  const handleFigureMove =
    (figure: FigureData | null) => (event: React.MouseEvent<HTMLElement>) => {
      console.log(currentDragFig, figure?.id);
      if (currentDragFig) {
        dispatch(
          moveFigure({
            figureId: currentDragFig.id,
            newPos: {
              x: event.clientX - shift.current.shiftX,
              y: event.clientY - shift.current.shiftY,
            },
          })
        );
        setDragFig({ ...currentDragFig, plt: { x: event.clientX, y: event.clientY } });
      }
    };

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
      {Object.values(figures).map((fig, index) => (
        <span
          key={index}
          onMouseDown={handleMouseDown(fig)}
          onMouseUp={handleMouseUp(fig)}
          onMouseMove={handleFigureMove(fig)}
          onDragStart={dragStub}>
          <Figure figure={fig} />
        </span>
      ))}
    </div>
  );
};

export default Field;
