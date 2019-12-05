export type Wire = string[];
  
export interface Coordinate {
  x: number;
  y: number;
}
  
export enum Axis {
  X,
  Y
}
  
export interface Segment {
  coordinate1: Coordinate;
  coordinate2: Coordinate;
}
  
export interface OrthogonalSegment extends Segment {
  axis: Axis;
}
