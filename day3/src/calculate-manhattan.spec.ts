import { calculateManhattan } from "./calculate-manhattan";

describe ('calculateManhattan', function() {
  const testData = [
    {
      segment: {
        coordinate1: {x: 3, y: 2},
        coordinate2: {x: 3, y: 9}
      },
      correctOutput: 7
    },
    {
      segment: {
        coordinate1: {x: 0, y: 0},
        coordinate2: {x: 3, y: 9}
      },
      correctOutput: 12
    }
  ]

  for (let testDatum of testData) {
    it(`should correctly calculate manhattan distance between the
        coordinates in a segment ${testDatum.segment}`, function() {
      const result = calculateManhattan(testDatum.segment);
      expect(result).toEqual(testDatum.correctOutput);
    });
  }
});
