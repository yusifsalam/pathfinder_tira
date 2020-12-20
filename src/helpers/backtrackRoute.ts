import { Node } from '../algorithms/core/node'

export function backtrackRoute(startNode: Node, endNode: Node): Node[] {
  let route = [endNode]
  console.log('endNode', endNode)
  let currentNode: Node = endNode
  if (!currentNode.parentNode) {
    return []
  }
  while (currentNode.parentNode !== startNode) {
    route.unshift(currentNode.parentNode)
    currentNode = currentNode.parentNode
  }
  route.unshift(startNode)
  console.log('route', route)
  return route
}
