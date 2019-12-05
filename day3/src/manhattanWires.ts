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
  const allIntersectingCoordinates = getAllIntersectingCoordinates(wire1, wire2);

  let smallestNonZeroDist = -1;
  for (let coord of allIntersectingCoordinates) {
    const segment = {
      coordinate1: {x:0, y:0},
      coordinate2: coord,
      axis: Axis.X    // it doesn't matter
    }
    const dist = calculateManhattan(segment);
    if (dist > 0 && (smallestNonZeroDist == -1 || dist < smallestNonZeroDist)) {
      smallestNonZeroDist = dist;
    }
  }
  return smallestNonZeroDist;
}

export function getAllIntersectingCoordinates(
  wire1: Wire, wire2: Wire): Coordinate[] {
  const segmentList1: OrthogonalSegment[] = convertWireToOrthogonalSegmentList(wire1);
  const segmentList2: OrthogonalSegment[] = convertWireToOrthogonalSegmentList(wire2);

  let intersectingCoordinates = [];

  for (let seg1 of segmentList1) {
    for (let seg2 of segmentList2) {
      const intersectionCoordinate = getIntersection(seg1, seg2);
      if (intersectionCoordinate) {
        intersectingCoordinates.push(intersectionCoordinate);
      }
    }
  }

  return intersectingCoordinates;
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

  // yuuuuuuck
  const s1X1 = segment1.coordinate1.x;
  const s1X2 = segment1.coordinate2.x;
  const s1Y1 = segment1.coordinate1.y;
  const s1Y2 = segment1.coordinate2.y;
  const s2X1 = segment2.coordinate1.x;
  const s2X2 = segment2.coordinate2.x;
  const s2Y1 = segment2.coordinate1.y;
  const s2Y2 = segment2.coordinate2.y;

  if (segment1.axis == Axis.X) {
    return s2X1 >= Math.min(s1X1, s1X2) &&
           s2X1 <= Math.max(s1X1, s1X2) &&
           s1Y2 <= Math.max(s2Y1, s2Y2) &&
           s1Y2 >= Math.min(s2Y1, s2Y2);
  }
  else if (segment1.axis == Axis.Y) {
    return s2Y1 >= Math.min(s1Y1, s1Y2) &&
           s2Y1 <= Math.max(s1Y1, s1Y2) &&
           s1X2 <= Math.max(s2X1, s2X2) &&
           s1X2 >= Math.min(s2X1, s2X2);
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
