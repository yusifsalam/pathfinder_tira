import { backtrackRoute } from '../helpers/backtrackRoute'
import { lowestFScore, removeNodeFromList } from '../helpers/listOps'
import { Heuristic, IPoint, JumpPoint } from '../types'
import { AStarParams } from './astar'
import { Grid } from './grid'
import { calculateHeuristic } from './heuristic'
import { Node } from './node'
import { maxVal, absoluteDiff } from '../helpers/math'

export class JPS {
  private openList: Node[] = []
  private grid: Grid
  private heuristic: Heuristic
  private destination: IPoint

  constructor(params: AStarParams) {
    this.grid = new Grid({
      height: params.height,
      width: params.width,
      grid: params.grid,
    })
    this.heuristic = params.heuristic || Heuristic.Octile
  }

  /**
   * Finds the shortest path from start to end
   * @param start Start Node
   * @param end End Node
   */
  public findPath(start: IPoint, end: IPoint): Node[] {
    const startNode = this.grid.nodeAt(start)
    const endNode = this.grid.nodeAt(end)
    this.destination = end

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
        console.log('reached the destination')
        return backtrackRoute(startNode, endNode)
      }

      this.openList = removeNodeFromList(currentNode, this.openList)
      currentNode.isOnOpenList = false
      currentNode.isOnClosedList = true
      this.findSuccessors(currentNode)
    }
    return backtrackRoute(startNode, endNode)
  }

  /**
   * Find successors for a given node
   * @param node Node
   */
  private findSuccessors(node: Node): void {
    const neighbors = this.findPrunedNeighbors(node, this.grid)
    for (let neighbor of neighbors) {
      if (!neighbor || neighbor.isOnClosedList) continue
      let jumpPoint: JumpPoint = this.findJumpPoint(
        { positionX: neighbor.positionX, positionY: neighbor.positionY },
        { positionX: node.positionX, positionY: node.positionY }
      )
      if (jumpPoint) {
        const jumpNode = this.grid.nodeAt({
          positionX: jumpPoint.positionX,
          positionY: jumpPoint.positionY,
        })
        if (jumpNode.isOnClosedList) continue
        const distance = calculateHeuristic(
          { positionX: jumpNode.positionX, positionY: jumpNode.positionY },
          { positionX: node.positionX, positionY: node.positionY },
          this.heuristic
        )
        const cumulativeGScore = node.gValue + distance
        if (!jumpNode.isOnOpenList || cumulativeGScore < jumpNode.gValue) {
          jumpNode.gValue = cumulativeGScore
          jumpNode.parentNode = node

          if (!jumpNode.isOnOpenList) {
            this.openList.push(jumpNode)
            jumpNode.isOnOpenList = true
          }
        }
      }
    }
  }

  /**
   * Finds the jump point
   * @param n child Node
   * @param p parent Node
   */
  private findJumpPoint(n: IPoint, p: IPoint): JumpPoint {
    const dx = n.positionX - p.positionX
    const dy = n.positionY - p.positionY
    if (!this.grid.nodeAt(n)) return null
    if (!this.grid.nodeAt(n).isWalkable) return null
    if (n === this.destination) return n
    // check diagonally
    if (dx !== 0 && dy !== 0) {
      if (
        this.findJumpPoint({ ...n, positionX: n.positionX + dx }, p) ||
        this.findJumpPoint({ ...n, positionY: n.positionY + dy }, p)
      ) {
        return n
      }
    }
    // check horizontally and vertically
    else {
      if (dx !== 0) {
        if (
          (this.grid.nodeAt({ ...n, positionY: n.positionY - 1 }) &&
            this.grid.nodeAt({ ...n, positionY: n.positionY - 1 }).isWalkable &&
            this.grid.nodeAt({
              positionX: n.positionX - dx,
              positionY: n.positionY - 1,
            }) &&
            !this.grid.nodeAt({
              positionX: n.positionX - dx,
              positionY: n.positionY - 1,
            }).isWalkable) ||
          (this.grid.nodeAt({ ...n, positionY: n.positionY + 1 }) &&
            this.grid.nodeAt({ ...n, positionY: n.positionY + 1 }).isWalkable &&
            this.grid.nodeAt({
              positionX: n.positionX - dx,
              positionY: n.positionY + 1,
            }) &&
            !this.grid.nodeAt({
              positionX: n.positionX - dx,
              positionY: n.positionY + 1,
            }).isWalkable)
        ) {
          return n
        }
      } else if (dy !== 0) {
        if (
          (this.grid.nodeAt({ ...n, positionX: n.positionX - 1 }) &&
            this.grid.nodeAt({ ...n, positionX: n.positionX - 1 }).isWalkable &&
            this.grid.nodeAt({
              positionX: n.positionX - 1,
              positionY: n.positionY - dy,
            }) &&
            !this.grid.nodeAt({
              positionX: n.positionX - 1,
              positionY: n.positionY - dy,
            }).isWalkable) ||
          (this.grid.nodeAt({ ...n, positionX: n.positionY + 1 }) &&
            this.grid.nodeAt({ ...n, positionX: n.positionY + 1 }).isWalkable &&
            this.grid.nodeAt({
              positionX: n.positionX + 1,
              positionY: n.positionY - dy,
            }) &&
            !this.grid.nodeAt({
              positionX: n.positionX + 1,
              positionY: n.positionY - dy,
            }).isWalkable)
        ) {
          return n
        }
      }
    }

    if (
      this.grid.nodeAt({ ...n, positionX: n.positionX + dx }) &&
      this.grid.nodeAt({ ...n, positionX: n.positionX + dx }).isWalkable &&
      this.grid.nodeAt({ ...n, positionY: n.positionY + dy }) &&
      this.grid.nodeAt({ ...n, positionY: n.positionY + dy }).isWalkable
    ) {
      return this.findJumpPoint(
        { positionX: n.positionX + dx, positionY: n.positionY + dy },
        n
      )
    } else {
      return null
    }
  }

  /**
   * Finds pruned neighbors for a given Node and Grid
   * @param node Node
   * @param g Grid
   */
  private findPrunedNeighbors(node: Node, g: Grid): Node[] {
    if (!node.parentNode)
      return g.getNeighbors({
        positionX: node.positionX,
        positionY: node.positionY,
      })
    else {
      const neighbors: Node[] = []
      const dx =
        (node.positionX - node.parentNode.positionX) /
        maxVal(absoluteDiff(node.positionX, node.parentNode.positionX), 1)
      const dy =
        (node.positionY - node.parentNode.positionY) /
        maxVal(absoluteDiff(node.positionY, node.parentNode.positionY), 1)

      // diagonal
      if (dx !== 0 && dy !== 0) {
        const p1: IPoint = {
          positionX: node.positionX,
          positionY: node.positionY + dy,
        }
        if (g.nodeAt(p1) && g.nodeAt(p1).isWalkable)
          neighbors.push(g.nodeAt(p1))
        const p2: IPoint = {
          positionX: node.positionX + dx,
          positionY: node.positionY,
        }
        if (g.nodeAt(p2) && g.nodeAt(p2).isWalkable)
          neighbors.push(g.nodeAt(p2))
        const p3: IPoint = {
          positionX: node.positionX + dx,
          positionY: node.positionY + dy,
        }
        if (
          g.nodeAt(p1) &&
          g.nodeAt(p1).isWalkable &&
          g.nodeAt(p2) &&
          g.nodeAt(p2).isWalkable
        )
          neighbors.push(g.nodeAt(p3))
      }
      // vertical and horizontal
      else {
        let nextWalkable: boolean
        if (dx !== 0) {
          const nextPoint: IPoint = {
            positionX: node.positionX + dx,
            positionY: node.positionY,
          }
          nextWalkable = g.nodeAt(nextPoint) && g.nodeAt(nextPoint).isWalkable
          const top =
            g.nodeAt({
              positionX: node.positionX,
              positionY: node.positionY + 1,
            }) &&
            g.nodeAt({
              positionX: node.positionX,
              positionY: node.positionY + 1,
            }).isWalkable
          const bottom =
            g.nodeAt({
              positionX: node.positionX,
              positionY: node.positionY - 1,
            }) &&
            g.nodeAt({
              positionX: node.positionX,
              positionY: node.positionY - 1,
            }).isWalkable
          if (nextWalkable) {
            neighbors.push(g.nodeAt(nextPoint))
            if (top)
              neighbors.push(
                g.nodeAt({
                  positionX: node.positionX + dx,
                  positionY: node.positionY + 1,
                })
              )
            if (bottom)
              neighbors.push(
                g.nodeAt({
                  positionX: node.positionX + dx,
                  positionY: node.positionY - 1,
                })
              )
          }
          if (top)
            neighbors.push(
              g.nodeAt({
                positionX: node.positionX,
                positionY: node.positionY + 1,
              })
            )
          if (bottom)
            neighbors.push(
              g.nodeAt({
                positionX: node.positionX,
                positionY: node.positionY - 1,
              })
            )
        } else if (dy !== 0) {
          const nextPoint: IPoint = {
            positionX: node.positionX,
            positionY: node.positionY + dy,
          }
          nextWalkable = g.nodeAt(nextPoint) && g.nodeAt(nextPoint).isWalkable
          const top =
            g.nodeAt({
              positionX: node.positionX + 1,
              positionY: node.positionY,
            }) &&
            g.nodeAt({
              positionX: node.positionX + 1,
              positionY: node.positionY,
            }).isWalkable
          const bottom =
            g.nodeAt({
              positionX: node.positionX - 1,
              positionY: node.positionY,
            }) &&
            g.nodeAt({
              positionX: node.positionX - 1,
              positionY: node.positionY,
            }).isWalkable
          if (nextWalkable) {
            neighbors.push(g.nodeAt(nextPoint))
            if (top)
              neighbors.push(
                g.nodeAt({
                  positionX: node.positionX + 1,
                  positionY: node.positionY + dy,
                })
              )
            if (bottom)
              neighbors.push(
                g.nodeAt({
                  positionX: node.positionX - 1,
                  positionY: node.positionY + dy,
                })
              )
          }
          if (top)
            neighbors.push(
              g.nodeAt({
                positionX: node.positionX + 1,
                positionY: node.positionY,
              })
            )
          if (bottom)
            neighbors.push(
              g.nodeAt({
                positionX: node.positionX - 1,
                positionY: node.positionY,
              })
            )
        }
      }
      return neighbors
    }
  }
}
