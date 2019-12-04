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

export function calculateClosestIntersectionDistance(wire1: Wire, wire2: Wire): number {
  return 123;
}

export function calculateClosestIntersectionCoordinate(
  wire1: Wire, wire2: Wire): Coordinate {

  return {x: 42, y: 42};
}

export function convertWireToOrthogonalSegmentList(wire: Wire): OrthogonalSegment[] {
  enum Directions {
    UP = 'U',
    RIGHT = 'R',
    DOWN = 'D',
    LEFT = 'L'
  }

  let lastCoordinate = {x:0, y:0};
  let segmentList = [];

  for (let translation of wire) {
    const direction = translation[0];
    const distance = parseInt(translation.substring(1));

    if (direction == Directions.RIGHT) {
      segmentList.push({
        coordinate1: {x: lastCoordinate.x, y: lastCoordinate.y},
        coordinate2: {x: lastCoordinate.x + distance, y: lastCoordinate.y},
        axis: Axis.X
      });
      lastCoordinate = {x: lastCoordinate.x + distance, y: lastCoordinate.y}
    }
    else if (direction == Directions.LEFT) {
      segmentList.push({
        coordinate1: {x: lastCoordinate.x, y: lastCoordinate.y},
        coordinate2: {x: lastCoordinate.x - distance, y: lastCoordinate.y},
        axis: Axis.X
      });
      lastCoordinate = {x: lastCoordinate.x - distance, y: lastCoordinate.y}
    }
    else if (direction == Directions.UP) {
      segmentList.push({
        coordinate1: {x: lastCoordinate.x, y: lastCoordinate.y},
        coordinate2: {x: lastCoordinate.x, y: lastCoordinate.y + distance},
        axis: Axis.Y
      });
      lastCoordinate = {x: lastCoordinate.x, y: lastCoordinate.y + distance}
    }
    else if (direction == Directions.DOWN) {
      segmentList.push({
        coordinate1: {x: lastCoordinate.x, y: lastCoordinate.y},
        coordinate2: {x: lastCoordinate.x, y: lastCoordinate.y - distance},
        axis: Axis.Y
      });
      lastCoordinate = {x: lastCoordinate.x, y: lastCoordinate.y - distance}
    }
    else {
      throw new Error(`Unexpected Direction ${direction} in wire ${wire}`);
    }
  }
  return segmentList;
}

export function calculateManhattan(segment: Segment): number {
  return Math.abs(segment.coordinate1.x - segment.coordinate2.x) +
         Math.abs(segment.coordinate1.y - segment.coordinate2.y);
}

export function intersects(segment1: OrthogonalSegment,
                           segment2: OrthogonalSegment): boolean {
  if (segment1.axis == segment2.axis) {
    return false;
  }
  if (segment1.axis == Axis.X) {
    const boundX1 = segment1.coordinate1.x;
    const boundX2 = segment1.coordinate2.x;
    const checkX = segment2.coordinate1.x;  // which is the same as coordinate2.x
    return checkX > Math.min(boundX1, boundX2) && checkX < Math.max(boundX1, boundX2);
  }
  else if (segment1.axis == Axis.Y) {
    const boundY1 = segment1.coordinate1.y;
    const boundY2 = segment1.coordinate2.y;
    const checkY = segment2.coordinate1.y;  // which is the same as coordinate2.y
    return checkY > Math.min(boundY1, boundY2) && checkY < Math.max(boundY1, boundY2);
  }
  throw new Error(`Unexpected Axis ${segment1.axis}`);
}

export function getIntersection(segment1: OrthogonalSegment,
                                segment2: OrthogonalSegment): Coordinate | null {
  if (intersects(segment1, segment2)) {
    if (segment1.axis == Axis.X) {
      return {x: segment2.coordinate1.x, y:segment1.coordinate1.y};
    }
    else {
      return {x: segment1.coordinate1.x, y:segment2.coordinate1.y};
    }
  }
  return null;
}
