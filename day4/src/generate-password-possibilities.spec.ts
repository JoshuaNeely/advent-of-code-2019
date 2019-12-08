import { generatePasswordPossibilities } from "./generate-password-possibilities"

describe('generatePasswordPossibilties', function() {
  it('should return possible passwords within a supplied range', function () {
    const lowerBound = 112345;
    const upperBound = 112346;
    const possiblities = generatePasswordPossibilities(lowerBound, upperBound); 
    expect(possiblities.length).toBe(2);
  });
});
