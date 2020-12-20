import { Node } from './core/node'
import { Grid } from './core/grid'
import { lowestFScore, removeNodeFromList } from '../helpers/listOps'
import { calculateHeuristic } from './core/heuristic'
import { Heuristic, IPoint } from '../types'
import { backtrackRoute } from '../helpers/backtrackRoute'

export interface AStarParams {
  height: number
  width: number
  grid: number[][]
  heuristic?: Heuristic
}

export class AStar {
  private openList: Node[] = []
  private grid: Grid
  private heuristic: Heuristic

  constructor(params: AStarParams) {
    this.grid = new Grid({
      height: params.height,
      width: params.width,
      grid: params.grid,
    })
    this.heuristic = params.heuristic || Heuristic.Octile
  }

  public findPath(start: IPoint, end: IPoint): Node[] {
    const startNode = this.grid.nodeAt(start)
    const endNode = this.grid.nodeAt(end)

    if (!startNode.isWalkable) {
      console.log('start or end nodes not walkable')
      return []
    } else if (!endNode.isWalkable) {
      console.log('end up not walkable')
      return []
    }
    this.openList.push(startNode)
    startNode.isOnOpenList = true

    // Calculate heuristic values and preemptively add unwalkable Nodes to the closed list
    for (let j = 0; j < this.grid.height; j++) {
      for (let i = 0; i < this.grid.width; i++) {
        let currentNode = this.grid.nodeAt({ positionX: i, positionY: j })
        if (currentNode.isWalkable) {
          const hValue = calculateHeuristic(
            {
              positionX: currentNode.positionX,
              positionY: currentNode.positionY,
            },
            { positionX: endNode.positionX, positionY: endNode.positionY },
            this.heuristic
          )
          currentNode.hValue = hValue
        }
      }
    }

    while (this.openList.length !== 0) {
      const currentNode = lowestFScore(this.openList)

      if (currentNode === endNode) {
        console.log('current node reached the end')
        return backtrackRoute(startNode, currentNode)
      }

      this.openList = removeNodeFromList(currentNode, this.openList)
      currentNode.isOnOpenList = false
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
