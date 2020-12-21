import { Node } from '../algorithms/core/node'

/**
 * Backtracks and returns the route from the destination to the start
 * @param startNode Starting node
 * @param endNode Destination node
 */
export function backtrackRoute(startNode: Node, endNode: Node): Node[] {
  let route = [endNode]
  let currentNode: Node = endNode
  if (!currentNode.parentNode) {
    return []
  }
  while (currentNode.parentNode !== startNode) {
    route.unshift(currentNode.parentNode)
    currentNode = currentNode.parentNode
  }
  route.unshift(startNode)
  return route
}
