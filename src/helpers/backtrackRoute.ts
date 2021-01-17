import { Grid } from '../algorithms/core/grid'
import { Node } from '../algorithms/core/node'
import { absoluteDiff } from './math'

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
/**
 * Interpolates the route between two points
 * @param s Starting node
 * @param e Destination node
 * @param grid Grid object
 */
function interpolate(s: Node, e: Node, grid: Grid): Node[] {
  let abs = absoluteDiff,
    path = []
  let x0 = s.positionX,
    x1 = e.positionX,
    y0 = s.positionY,
    y1 = e.positionY
  let dx = abs(x1, x0)
  let dy = abs(y1, y0)

  let sx = x0 < x1 ? 1 : -1
  let sy = y0 < y1 ? 1 : -1

  let err = dx - dy

  while (true) {
    path.push(grid.nodeAt({ positionX: x0, positionY: y0 }))

    if (x0 === x1 && y0 === y1) {
      break
    }

    let e2 = 2 * err
    if (e2 > -dy) {
      err = err - dy
      x0 = x0 + sx
    }
    if (e2 < dx) {
      err = err + dx
      y0 = y0 + sy
    }
  }
  return path
}

/**
 * Expands a compressed path consisting of jump points
 * @param path Compressed route
 * @param grid Grid object
 */
export function expandRoute(path: Node[], grid: Grid): Node[] {
  let expandedRoute = [],
    len = path.length

  if (len < 2) {
    return expandedRoute
  }

  for (let i = 0; i < len - 1; i++) {
    let startNode = path[i]
    let endNode = path[i + 1]

    let interpolated = interpolate(startNode, endNode, grid)
    let interpolatedLen = interpolated.length
    for (let j = 0; j < interpolatedLen - 1; j++) {
      expandedRoute.push(interpolated[j])
    }
  }
  expandedRoute.push(path[len - 1])
  return expandedRoute
}
