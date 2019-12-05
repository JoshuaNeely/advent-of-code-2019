import { calculateClosestIntersectionDistance } from "./calculate-closest-intersection-distance";
import { Wire } from "./interfaces";
import { readFileSync } from 'fs';

const wire1Data = readFileSync('./src/wire1Data.txt', 'utf-8');
const wire2Data = readFileSync('./src/wire2Data.txt', 'utf-8');

const wire1: Wire = wire1Data.split(',');
const wire2: Wire = wire2Data.split(',');

console.log(calculateClosestIntersectionDistance(wire1, wire2));
