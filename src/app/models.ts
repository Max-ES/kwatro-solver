export enum Color {
    Red = 1,
    Blue = 2,
    Yellow = 3,
    Green = 4,
  }
  export enum Shape {
    Circle = 1,
    Triangle = 2,
    Rectangle = 3,
    Cross = 4,
  }
  
  export type Field = null | [Color, Shape, 1 | 2 | 3 | 4];
  export type Row = Array<Field>;
  export type Grid = Array<Row>;
  export type BoolGrid = Array<Array<boolean>>;