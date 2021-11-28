export enum FigureType {
  Small,
  Wide,
  Tall,
  Big,
}

export interface Point {
  x: number;
  y: number;
}
export interface FigureData {
  id: string;
  type: FigureType;
  plt: Point; // point Left Top
  prb: Point; // point Right Bottom
  width: number;
  height: number;
}

export interface FigureMethods {
  getWidth: () => number;
  getHeigth: () => number;
  getPLT: () => Point;
  getPRB: () => Point;
  getPLB: () => Point;
  getPRT: () => Point;
}

export type Figure = FigureData | (FigureData & FigureMethods);

export interface Field {
  width: number;
  height: number;
  figures: Figure[];
}

export interface Game {
  field: Field;
  win: boolean;
}
