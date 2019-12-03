type Intcode = number[];

enum Ops {
  ADD = 1,
  MULTIPLY = 2,
  END = 99
}

export function processIntcode(intcode: Intcode): Intcode {
  const opcode = intcode[0];
  const leftIndex = intcode[1];
  const rightIndex = intcode[2];
  const resultIndex = intcode[3];

  const leftVal = intcode[leftIndex];
  const rightVal = intcode[rightIndex];

  const result = operate(opcode, leftVal, rightVal);
  intcode[resultIndex] = result;
  return intcode;
}


function operate(opcode: Ops, left: number, right: number): number {
  if (opcode == Ops.ADD) {
    return left + right;
  }
  if (opcode == Ops.MULTIPLY) {
    return left * right;
  }
  else {
    return -1;
  }
}
