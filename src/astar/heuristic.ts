interface Node {
  positionX: number
  positionY: number
}

export const heuristic = (n1: Node, n2: Node): number => {
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
