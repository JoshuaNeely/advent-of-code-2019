import { Segment } from "./interfaces";

export function calculateManhattan(segment: Segment): number {
  return Math.abs(segment.coordinate1.x - segment.coordinate2.x) +
         Math.abs(segment.coordinate1.y - segment.coordinate2.y);
}
