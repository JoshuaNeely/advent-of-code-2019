import { Axis, Coordinate, OrthogonalSegment, Wire } from "./interfaces";
import { convertWireToOrthogonalSegmentList } from "./convert-wire-to-orthogonal-segment-list";

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
