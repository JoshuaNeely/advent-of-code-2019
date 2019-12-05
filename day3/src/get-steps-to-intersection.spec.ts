import { getStepsToIntersection } from "./get-steps-to-intersection";

describe('getStepsToIntersection', function() {
  const testData = [
    {
      wire1: ["R8","U5","L5","D3"],
      wire2: ["U7","R6","D4","L4"],
      intersections: [
        {
          coordinate: {x: 3, y: 3},
          stepsWire1: 20,
          stepsWire2: 20
        },
        {
          coordinate: {x: 6, y: 5},
          stepsWire1: 15,
          stepsWire2: 15 
        }
      ]
    }
  ]

  for (let testDatum of testData) {
    for (let intersection of testDatum.intersections) {
      it(`should find the number of steps to each intersection on both wires`, function() {
        const stepsWire1 = getStepsToIntersection(intersection.coordinate, testDatum.wire1);
        const stepsWire2 = getStepsToIntersection(intersection.coordinate, testDatum.wire2);
        expect(stepsWire1).toBe(intersection.stepsWire1);
        expect(stepsWire2).toBe(intersection.stepsWire2);
      });
    }
  }
});
