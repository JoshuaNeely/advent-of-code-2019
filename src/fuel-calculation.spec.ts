import { calculateFuel, reducer } from "src/fuel-calculation";

const testData = [
  {mass: 12, fuel: 2},
  {mass: 14, fuel: 2},
  {mass: 1969, fuel: 966},
  {mass: 100756, fuel: 50346},
]

describe('calculateFuel', function() {
  for (const datum of testData) {
    it(`should correctly calculate fuel from ${datum.mass} mass`, function() {
      const result = calculateFuel(datum.mass);
      expect(result).toBe(datum.fuel);
    });
  }

  it(`should correctly sum up fuel calculations`, function() {
    const masses = [12, 1969];
    const result = masses.reduce(reducer, 0);
    expect(result).toBe(calculateFuel(12) + calculateFuel(1969));
  });
});
