import { calculateClosestIntersection, intersects, getIntersection } from "./manhattanWires";
import { Wire, Coordinate, OrthogonalSegment, Axis } from "./manhattanWires";

describe('calculateClosestIntersection', function() {
  const testData = [
    {
      wire1: ["R75","D30","R83","U83","L12","D49","R71","U7","L72"],
      wire2: ["U62","R66","U55","R34","D71","R55","D58","R83"],
      correctOutput: 159
    },
    {
      wire1: ["R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51"],
      wire2: ["U98","R91","D20","R16","D67","R40","U7","R15","U6","R7"],
      correctOutput: 135
    }
  ]

  for (let testDatum of testData) {
    it(`should find the closest intersection with ${testDatum.wire1} and ${testDatum.wire2}`, function() {
      const result = calculateClosestIntersection(testDatum.wire1, testDatum.wire2);
      expect(result).toEqual(testDatum.correctOutput);
    });
  }
});

describe ('intersection functions', function() {
  interface TestDatum {
    s1: OrthogonalSegment;
    s2: OrthogonalSegment;
    doesIntersect: boolean;
    intersectionCoordinate: Coordinate | null;
  }

  const testData: TestDatum[] = [
    {
      s1: {
        coordinate1: {x: 3, y: 2},
        coordinate2: {x: 9, y: 2},
        axis: Axis.X
      },
      s2: {
        coordinate1: {x: 5, y: 9},
        coordinate2: {x: 5, y: 0},
        axis: Axis.Y
      },
      doesIntersect: true,
      intersectionCoordinate: {x: 5, y: 2}
    },
    {
      s1: {
        coordinate1: {x: 3, y: 2},
        coordinate2: {x: 9, y: 2},
        axis: Axis.X
      },
      s2: {
        coordinate1: {x: 5, y: 9},
        coordinate2: {x: 6, y: 9},
        axis: Axis.X
      },
      doesIntersect: false,
      intersectionCoordinate: null
    },
    {
      s1: {
        coordinate1: {x: 3, y: 2},
        coordinate2: {x: 9, y: 2},
        axis: Axis.X
      },
      s2: {
        coordinate1: {x: 2, y: 9},
        coordinate2: {x: 2, y: 0},
        axis: Axis.Y
      },
      doesIntersect: false,
      intersectionCoordinate: null 
    }
  ]

  describe('intersects', function() {
    for (let testDatum of testData) {
      it(`should determine if ${testDatum.s1} and ${testDatum.s2} intersect`, function() {
        const result = intersects(testDatum.s1, testDatum.s2);
        expect(result).toEqual(testDatum.doesIntersect);
      });
    }
  });

  describe('getIntersection', function() {
    for (let testDatum of testData) {
      it(`should return correct intersection coordinate or null for ${testDatum.s1} and ${testDatum.s2}`, function() {
        const result = getIntersection(testDatum.s1, testDatum.s2);
        expect(result).toEqual(testDatum.intersectionCoordinate);
      });
    }
  });
});
