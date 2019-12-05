import { calculateClosestIntersectionDistance } from "./calculate-closest-intersection-distance";

describe('calculateClosestIntersectionDistance', function() {
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
    it(`should find the closest intersection distance with 
        ${testDatum.wire1} and ${testDatum.wire2}`, function() {
      const result = calculateClosestIntersectionDistance(testDatum.wire1, testDatum.wire2);
      expect(result).toEqual(testDatum.correctOutput);
    });
  }
});
