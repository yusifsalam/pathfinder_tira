import { Node } from '../astar/node'

/**
 * Calculates an absolute value of the the difference between two numbers
 * @param a First argument
 * @param b Second argument
 */
export const absoluteDiff = (a: number, b: number): number => {
  const diff = a >= b ? a - b : b - a
  return diff
}

/**
 * Calculates the smaller number from the two arguments
 * @param a First argument
 * @param b Second argument
 */
export const minVal = (a: number, b: number): number => {
  return a > b ? a : b
}

/**
 * Returns the Node with the lowest f-score
 * @param arr Array containing Nodes
 */
export const lowestFScore = (arr: Node[]): Node => {
  let lowestScore: number = Infinity
  let bestNode: Node
  for (let n of arr) {
    if (n.fValue < lowestScore) {
      lowestScore = n.fValue
      bestNode = n
    }
  }
  if (!bestNode) return
  return bestNode
}
