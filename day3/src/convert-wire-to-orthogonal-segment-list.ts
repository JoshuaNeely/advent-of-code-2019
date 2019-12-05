import { Wire, Coordinate, OrthogonalSegment, Segment, Axis } from "./interfaces"

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
