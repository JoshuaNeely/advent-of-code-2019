import { processIntcode, intcodeCalculator } from "src/intcode";

const testData = [
  {
    input: [1,0,0,0,99],
    correctOutput: [2,0,0,0,99]
  },
  {
    input: [2,3,0,3,99],
    correctOutput: [2,3,0,6,99]
  },
  {
    input: [2,4,4,5,99,0],
    correctOutput: [2,4,4,5,99,9801]
  },
  {
    input: [1,1,1,4,99, 5,6,0,99],
    correctOutput: [30,1,1,4,2,5,6,0,99]
  },
  {
    input: [1,9,10,3,2,3,11,0,99,30,40,50],
    correctOutput: [3500,9,10,70,2,3,11,0,99,30,40,50]
  }
]

describe('processIntcode', function() {
  for (const testDatum of testData) {
    it(`should correctly process ${testDatum.input}`, function() {
      const result = processIntcode(testDatum.input);
      expect(result.toString()).toEqual(testDatum.correctOutput.toString());
    });
  }
});

describe('intcodeCalculator', function() {
  const inputIntcode = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,2,19,13,23,1,23,10,27,1,13,27,31,2,31,10,35,1,35,9,39,1,39,13,43,1,13,43,47,1,47,13,51,1,13,51,55,1,5,55,59,2,10,59,63,1,9,63,67,1,6,67,71,2,71,13,75,2,75,13,79,1,79,9,83,2,83,10,87,1,9,87,91,1,6,91,95,1,95,10,99,1,99,13,103,1,13,103,107,2,13,107,111,1,111,9,115,2,115,10,119,1,119,5,123,1,123,2,127,1,127,5,0,99,2,14,0,0];
  const correctAnswer = 4330636;

  it(`should correctly calculate the result from an intcode input`, function() {
    const result = intcodeCalculator(inputIntcode, 12, 2);
    expect(result).toEqual(correctAnswer);
  });
});
