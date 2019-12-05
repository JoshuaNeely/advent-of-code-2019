import { Wire, Coordinate, OrthogonalSegment, Segment, Axis } from "./interfaces"
import { getAllIntersectingCoordinates } from "./intersection"
import { calculateManhattan } from "./calculate-manhattan"

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
