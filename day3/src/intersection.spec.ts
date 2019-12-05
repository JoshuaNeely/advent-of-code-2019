import { Wire, Coordinate, OrthogonalSegment, Segment, Axis } from "./interfaces";
import { intersects, getIntersection, getAllIntersectingCoordinates } from "./intersection";

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
  },
  {
    s1: {
      coordinate1: {x: 0, y: 0},
      coordinate2: {x: 8, y: 0},
      axis: Axis.X
    },
    s2: {
      coordinate1: {x: 6, y: 7},
      coordinate2: {x: 6, y: 3},
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
    it(`should return correct intersection coordinate or null for 
        ${testDatum.s1} and ${testDatum.s2}`, function() {
      const result = getIntersection(testDatum.s1, testDatum.s2);
      expect(result).toEqual(testDatum.intersectionCoordinate);
    });
  }
});


describe('getAllIntersectingCoordinates', function() {
  const testData = [
    {
      wire1: ["R8","U5","L5","D3"],
      wire2: ["U7","R6","D4","L4"],
      correctOutput: [{x:0, y:0}, {x: 3, y: 3}, {x: 6, y: 5}]
    }
  ]

  for (let testDatum of testData) {
    it(`should find all intersecting coordinates with wires 
        ${testDatum.wire1} and ${testDatum.wire2}`, function() {
      const result = getAllIntersectingCoordinates(testDatum.wire1, testDatum.wire2);

      for (let expectedCoordinate of testDatum.correctOutput) {
        let found = false;
        for (let resultCoordinate of result) {
          if (resultCoordinate.x == expectedCoordinate.x &&
            resultCoordinate.y == expectedCoordinate.y) {
            found = true;
          }
        }
        expect(found).toBe(true);
      }
    });
  }
});
