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
