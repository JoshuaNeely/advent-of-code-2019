type Intcode = number[];

enum Ops {
  ADD = 1,
  MULTIPLY = 2,
  END = 99
}

export function processIntcode(intcode: Intcode, opcodeIndex:number=0): Intcode {
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
  intcode[resultIndex] = result;

  return processIntcode(intcode, opcodeIndex+4);
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
