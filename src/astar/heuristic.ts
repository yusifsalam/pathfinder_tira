/**
 * Manhattan distance heuristic function
 * @param n1 Starting node
 * @param n2 Destination node
 */
export const heuristicManhattan = (n1: IPoint, n2: IPoint): number => {
  const xDiff =
    n1.positionX >= n2.positionX
      ? n1.positionX - n2.positionX
      : n2.positionX - n1.positionX
  const yDiff =
    n1.positionY >= n2.positionY
      ? n1.positionY - n2.positionY
      : n2.positionY - n1.positionY
  return xDiff + yDiff
}
