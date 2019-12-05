import { Wire, Coordinate, OrthogonalSegment, Segment, Axis } from "./interfaces";
import { calculateManhattan } from "./calculate-manhattan";
import { convertWireToOrthogonalSegmentList } from "./convert-wire-to-orthogonal-segment-list";
import { intersects } from "./intersection";

export function getSegmentsToIntersection(intersection: Coordinate, segmentList: OrthogonalSegment[]): number {
  for (let count=1; count<=segmentList.length; count++) {
    const compareSegment = segmentList[count-1];
    const coordAsSegment = {
      coordinate1: intersection,
      coordinate2: intersection,
      axis: (compareSegment.axis == Axis.Y ? Axis.X : Axis.Y)
    };
    if (intersects(segmentList[count-1], coordAsSegment)) {
      return count;
    }
  }
  throw new Error(`ERROR intersection coordinate ${stringFromCoord(intersection)} does not appear in segment list ${stringFromSegList(segmentList)}`);
}

export function getStepsToIntersection(intersection: Coordinate, wire: Wire): number {
  const segmentList: OrthogonalSegment[] = convertWireToOrthogonalSegmentList(wire);
  const numSegments = getSegmentsToIntersection(intersection, segmentList);
  let steps = 0;
  for (let i=0; i<numSegments; i++) {
    steps += calculateManhattan(segmentList[i]);
  }
  return steps;
}

// arggg shoulda made classes instead
function stringFromCoord(c: Coordinate) {
  return `Coordinate:(x:${c.x}, y:${c.y})`;
}
function stringFromSegList(segList: Segment[]) {
  let s = "";
  for (let segment of segList) {
    s += `${stringFromCoord(segment.coordinate1)} ${stringFromCoord(segment.coordinate2)}\n`
  }
  return `SegmentList:(${s})`;
}
