type Intcode = number[];

enum Ops {
  ADD = 1,
  MULTIPLY = 2,
  END = 99
}

export function processIntcode(intcode: Intcode, opcodeIndex:number=0): Intcode {
  const deepCopy = intcode.slice();

  const opcode = intcode[opcodeIndex];
  if (opcode == Ops.END) {
    return intcode;
  }

  const leftIndex = intcode[opcodeIndex+1];
  const rightIndex = intcode[opcodeIndex+2];
  const resultIndex = intcode[opcodeIndex+3];

  const leftVal = intcode[leftIndex];
  const rightVal = intcode[rightIndex];

  const result = operate(opcode, leftVal, rightVal);
  deepCopy[resultIndex] = result;

  return processIntcode(deepCopy, opcodeIndex+4);
}

function operate(opcode: Ops, left: number, right: number): number {
  if (opcode == Ops.ADD) {
    return left + right;
  }
  if (opcode == Ops.MULTIPLY) {
    return left * right;
  }
  else {
    throw new Error(`Unexpected opcode ${opcode}`);
  }
}

/**
 *  Take an intcode as input
 *  Replace address 1 with an input noun
 *  Replace address 2 with an input verb
 *  THEN process the intcode
 *  Return output NOW held in address 0
 */
export function intcodeCalculator(intcode: Intcode, noun: number, verb: number): number {
  const deepCopy = intcode.slice();
  const nounPosition = 1;
  const verbPosition = 2;
  const outputPosition = 0;

  deepCopy[nounPosition] = noun;
  deepCopy[verbPosition] = verb;

  const resultIntcode = processIntcode(deepCopy);
  const result = resultIntcode[outputPosition];

  return result;
}
