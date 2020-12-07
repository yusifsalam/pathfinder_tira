import { Node } from './node'
import { Grid } from './grid'
import { lowestFScore, removeNodeFromList } from '../utils/listOps'
import { heuristicOctile } from './heuristic'

interface AStarParams {
  grid: number[][]
}

export class AStar {
  private closedList: Node[] = []
  private openList: Node[] = []
  private route: Node[] = []
  private grid: Grid

  constructor(params: AStarParams) {
    this.grid = new Grid({ grid: params.grid })
  }

  public findPath(start: IPoint, end: IPoint): Node[] {
    const startNode = this.grid.nodeAt(start)
    const endNode = this.grid.nodeAt(end)

    if (!startNode.isWalkable || !endNode.isWalkable) {
      return []
    }

    this.openList.push(startNode)
    startNode.isOnOpenList = true
    this.route.push(startNode)

    // Calculate heuristic values and preemptively add unwalkable Nodes to the closed list
    for (let j = 0; j < this.grid.height; j++) {
      for (let i = 0; i < this.grid.width; i++) {
        let currentNode = this.grid.nodeAt({ positionX: i, positionY: j })
        if (!currentNode.isWalkable) {
          this.closedList.push(currentNode)
          currentNode.isOnClosedList = true
        } else {
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
      this.openList = removeNodeFromList(currentNode, this.openList)
      currentNode.isOnOpenList = false
      this.closedList.push(currentNode)
      currentNode.isOnClosedList = true

      if (currentNode === endNode) {
        return this.route
      }

      const currentNeighbors = this.grid.getNeighbors({
        positionX: currentNode.positionX,
        positionY: currentNode.positionY,
      })

      for (let neighbor of currentNeighbors) {
        if (neighbor.isOnClosedList) {
          continue
        }
        // Distance to neighbor is sqrt(2) if it's on a diogonal, otherwise 1
        const distanceToNeighbor =
          currentNode.positionX !== neighbor.positionX &&
          currentNode.positionY !== neighbor.positionY
            ? Math.sqrt(2)
            : 1
        const tentativeGScore = currentNode.gValue + distanceToNeighbor
        if (tentativeGScore < neighbor.gValue) {
          neighbor.parentNode = currentNode
          this.route.push(neighbor)
          neighbor.gValue = tentativeGScore
          if (!neighbor.isOnOpenList) {
            this.openList.push(neighbor)
            neighbor.isOnOpenList = true
          }
        }
      }
    }
    return this.route
  }
}
