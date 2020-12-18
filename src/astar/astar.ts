import { Node } from './node'
import { Grid } from './grid'
import { lowestFScore, removeNodeFromList } from '../utils/listOps'
import { heuristicOctile } from './heuristic'

interface AStarParams {
  height: number
  width: number
  grid: number[][]
}

export class AStar {
  private closedList: Node[] = []
  private openList: Node[] = []
  private grid: Grid

  constructor(params: AStarParams) {
    this.grid = new Grid({
      height: params.height,
      width: params.width,
      grid: params.grid,
    })
  }

  public backtrackRoute(startNode: Node, endNode: Node): Node[] {
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

  public findPath(start: IPoint, end: IPoint): Node[] {
    const startNode = this.grid.nodeAt(start)
    const endNode = this.grid.nodeAt(end)

    if (!startNode.isWalkable || !endNode.isWalkable) {
      console.log('start or end nodes not walkable')
      return []
    }
    startNode.gValue = 0
    this.openList.push(startNode)
    startNode.isOnOpenList = true

    // Calculate heuristic values and preemptively add unwalkable Nodes to the closed list
    for (let j = 0; j < this.grid.height; j++) {
      for (let i = 0; i < this.grid.width; i++) {
        let currentNode = this.grid.nodeAt({ positionX: i, positionY: j })
        if (currentNode.isWalkable) {
          const hValue = heuristicOctile(
            {
              positionX: currentNode.positionX,
              positionY: currentNode.positionY,
            },
            { positionX: endNode.positionX, positionY: endNode.positionY }
          )
          currentNode.hValue = hValue
        }
      }
    }

    while (this.openList.length !== 0) {
      const currentNode = lowestFScore(this.openList)

      if (currentNode === endNode) {
        console.log('current node reached the end')
        return this.backtrackRoute(startNode, currentNode)
      }

      this.openList = removeNodeFromList(currentNode, this.openList)
      currentNode.isOnOpenList = false
      this.closedList.push(currentNode)
      currentNode.isOnClosedList = true

      const currentNeighbors = this.grid.getNeighbors({
        positionX: currentNode.positionX,
        positionY: currentNode.positionY,
      })

      for (let neighbor of currentNeighbors) {
        // invalid nodes are ignored
        if (!neighbor || neighbor.isOnClosedList) continue

        // Distance to neighbor is sqrt(2) if it's on a diagonal, otherwise 1
        const distanceToNeighbor =
          currentNode.positionX !== neighbor.positionX &&
          currentNode.positionY !== neighbor.positionY
            ? Math.sqrt(2)
            : 1
        const tentativeGScore = currentNode.gValue + distanceToNeighbor
        let gScoreUpdate = false
        if (!neighbor.isOnOpenList) {
          gScoreUpdate = true
          neighbor.isOnOpenList = true
          this.openList.push(neighbor)
        } else if (tentativeGScore < neighbor.gValue) {
          gScoreUpdate = true
        }
        if (gScoreUpdate) {
          neighbor.parentNode = currentNode
          neighbor.gValue = tentativeGScore
        }
      }
    }
    console.log('no route found')
    return []
  }
}
