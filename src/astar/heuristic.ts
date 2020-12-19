import { absoluteDiff, minVal } from '../utils/math'
import { IPoint } from '../types'

/**
 * Manhattan distance heuristic function
 * @param n1 Starting node
 * @param n2 Destination node
 */
export const heuristicManhattan = (n1: IPoint, n2: IPoint): number => {
  const xDiff = absoluteDiff(n1.positionX, n2.positionX)
  const yDiff = absoluteDiff(n1.positionY, n2.positionY)
  return xDiff + yDiff
}

/**
 * Octile distance heuristic function
 * @param n1 Starting node
 * @param n2 Destination node
 */
export const heuristicOctile = (n1: IPoint, n2: IPoint): number => {
  const D1 = 1
  const D2 = Math.sqrt(2)
  const xDiff = absoluteDiff(n1.positionX, n2.positionX)
  const yDiff = absoluteDiff(n1.positionY, n2.positionY)
  const minDiff = minVal(xDiff, yDiff)
  return D1 * (xDiff + yDiff) + (D2 - 2 * D1) * minDiff
}

/**
 * Heuristic function that always returns zero
 */
export const heuristicZero = (): number => {
  return 0
}
