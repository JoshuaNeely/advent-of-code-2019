import { module_masses } from "./module_masses";

export function calculateFuel(mass: number): number {
  let result = Math.floor(mass / 3) - 2;
  if (result > 0) {
    return result + calculateFuel(result);
  }
  return 0;
}

export const reducer = (accumulator: number, currentValue: number) => accumulator + calculateFuel(currentValue);


const result = module_masses.reduce(reducer, 0);
console.log(result);
