import { Node } from '../astar/node'

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

/**
 * Removes a Node from a list
 * @param node Node to be removed
 * @param arr List of Nodes
 */

export const removeNodeFromList = (node: Node, arr: Node[]): Node[] => {
  return arr.filter((n) => n.id !== node.id)
}
