import { backtrackRoute, expandRoute } from '../helpers/backtrackRoute'
import { lowestFScore, removeNodeFromList } from '../helpers/listOps'
import { Heuristic, IPoint, JumpPoint, Result } from '../types'
import { AStarParams } from './astar'
import { Grid } from './core/grid'
import { calculateHeuristic } from './core/heuristic'
import { Node } from './core/node'
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
  public findPath(start: IPoint, end: IPoint): Result {
    const startNode = this.grid.nodeAt(start)
    const endNode = this.grid.nodeAt(end)
    this.destination = end

    if (!startNode.isWalkable) {
      return {
        error: 'start node not walkable',
        path: [],
      }
    } else if (!endNode.isWalkable) {
      return {
        error: 'end node not walkable',
        path: [],
      }
    }
    startNode.gValue = 0
    this.openList.push(startNode)
    startNode.isOnOpenList = true

    while (this.openList.length !== 0) {
      const currentNode = lowestFScore(this.openList)
      this.openList = removeNodeFromList(currentNode, this.openList)
      // currentNode.isOnOpenList = false
      currentNode.isOnClosedList = true
      // console.log('current node', currentNode)
      if (
        currentNode.positionX === endNode.positionX &&
        currentNode.positionY === endNode.positionY
      ) {
        const shortRoute = backtrackRoute(startNode, currentNode)
        const fullRoute = expandRoute(shortRoute, this.grid)
        return { path: fullRoute }
      }

      this.findSuccessors(currentNode)
    }
    return { error: 'no route found', path: [] }
  }

  /**
   * Find successors for a given node
   * @param node Node
   */
  private findSuccessors(node: Node): void {
    const neighbors = this.findPrunedNeighbors(node)
    for (let neighbor of neighbors) {
      if (!neighbor || neighbor.isOnClosedList) continue

      let jumpPoint: JumpPoint = this.findJumpPoint(
        { positionX: neighbor.positionX, positionY: neighbor.positionY },
        { positionX: node.positionX, positionY: node.positionY }
      )

      if (jumpPoint) {
        const jumpNode = this.grid.nodeAt(jumpPoint)

        if (jumpNode.isOnClosedList) continue
        const distance = calculateHeuristic(
          { positionX: jumpNode.positionX, positionY: jumpNode.positionY },
          { positionX: node.positionX, positionY: node.positionY },
          this.heuristic
        )
        const cumulativeGScore = node.gValue + distance
        if (!jumpNode.isOnOpenList || cumulativeGScore < jumpNode.gValue) {
          jumpNode.gValue = cumulativeGScore
          jumpNode.hValue =
            jumpNode.hValue ||
            calculateHeuristic(jumpPoint, this.destination, this.heuristic)
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

    if (!this.grid.walkableAt(n)) {
      return null
    }
    if (
      n.positionX === this.destination.positionX &&
      n.positionY === this.destination.positionY
    ) {
      return n
    }

    // checking forced neighbors
    // check diagonally
    if (dx !== 0 && dy !== 0) {
      if (
        (this.grid.walkableAt({
          positionX: n.positionX - dx,
          positionY: n.positionY + dy,
        }) &&
          !this.grid.walkableAt({
            positionX: n.positionX - dx,
            positionY: n.positionY,
          })) ||
        (this.grid.walkableAt({
          positionX: n.positionX + dx,
          positionY: n.positionY - dy,
        }) &&
          !this.grid.walkableAt({
            positionX: n.positionX,
            positionY: n.positionY - dy,
          }))
      ) {
        return n
      }

      if (
        this.findJumpPoint(
          { positionX: n.positionX + dx, positionY: n.positionY },
          n
        ) ||
        this.findJumpPoint(
          { positionX: n.positionX, positionY: n.positionY + dy },
          n
        )
      ) {
        return n
      }
    }
    // check horizontally and vertically
    else {
      if (dx !== 0) {
        if (
          (this.grid.walkableAt({
            positionX: n.positionX + dx,
            positionY: n.positionY + 1,
          }) &&
            !this.grid.walkableAt({
              positionX: n.positionX,
              positionY: n.positionY + 1,
            })) ||
          (this.grid.walkableAt({
            positionX: n.positionX + dx,
            positionY: n.positionY - 1,
          }) &&
            !this.grid.walkableAt({
              positionX: n.positionX,
              positionY: n.positionY - 1,
            }))
        ) {
          return n
        }
      } else {
        if (
          (this.grid.walkableAt({
            positionX: n.positionX + 1,
            positionY: n.positionY + dy,
          }) &&
            !this.grid.walkableAt({
              positionX: n.positionX + 1,
              positionY: n.positionY,
            })) ||
          (this.grid.walkableAt({
            positionX: n.positionX - 1,
            positionY: n.positionY + dy,
          }) &&
            !this.grid.walkableAt({
              positionX: n.positionX - 1,
              positionY: n.positionY,
            }))
        ) {
          return n
        }
      }
    }

    return this.findJumpPoint(
      { positionX: n.positionX + dx, positionY: n.positionY + dy },
      n
    )
  }

  /**
   * Finds pruned neighbors for a given Node
   * @param node Node
   */
  private findPrunedNeighbors(node: Node): Node[] {
    // node doesn't have a parent, return all valid neighbors
    if (!node.parentNode) {
      return this.grid.getNeighbors({
        positionX: node.positionX,
        positionY: node.positionY,
      })
    } else {
      // node has a parent, so prune based on direction
      const neighbors: Node[] = []
      const dx =
        (node.positionX - node.parentNode.positionX) /
        maxVal(absoluteDiff(node.positionX, node.parentNode.positionX), 1) // normalized x direction
      const dy =
        (node.positionY - node.parentNode.positionY) /
        maxVal(absoluteDiff(node.positionY, node.parentNode.positionY), 1) // normalized y direction
      // diagonal
      if (dx !== 0 && dy !== 0) {
        if (
          this.grid.walkableAt({
            positionX: node.positionX,
            positionY: node.positionY + dy,
          })
        ) {
          neighbors.push(
            this.grid.nodeAt({
              positionX: node.positionX,
              positionY: node.positionY + dy,
            })
          )
        }
        if (
          this.grid.walkableAt({
            positionX: node.positionX + dx,
            positionY: node.positionY,
          })
        ) {
          neighbors.push(
            this.grid.nodeAt({
              positionX: node.positionX + dx,
              positionY: node.positionY,
            })
          )
        }
        if (
          this.grid.walkableAt({
            positionX: node.positionX + dx,
            positionY: node.positionY + dy,
          })
        ) {
          neighbors.push(
            this.grid.nodeAt({
              positionX: node.positionX + dx,
              positionY: node.positionY + dy,
            })
          )
        }
        if (
          !this.grid.walkableAt({
            positionX: node.positionX - dx,
            positionY: node.positionY,
          })
        ) {
          neighbors.push(
            this.grid.nodeAt({
              positionX: node.positionX - dx,
              positionY: node.positionY + dy,
            })
          )
        }
        if (
          !this.grid.walkableAt({
            positionX: node.positionX,
            positionY: node.positionY - dy,
          })
        ) {
          neighbors.push(
            this.grid.nodeAt({
              positionX: node.positionX + dx,
              positionY: node.positionY - dy,
            })
          )
        }
      }
      // vertical and horizontal
      else {
        if (dx === 0) {
          if (
            this.grid.walkableAt({
              positionX: node.positionX,
              positionY: node.positionY + dy,
            })
          ) {
            neighbors.push(
              this.grid.nodeAt({
                positionX: node.positionX,
                positionY: node.positionY + dy,
              })
            )
          }
          if (
            !this.grid.walkableAt({
              positionX: node.positionX + 1,
              positionY: node.positionY,
            })
          ) {
            neighbors.push(
              this.grid.nodeAt({
                positionX: node.positionX + 1,
                positionY: node.positionY + dy,
              })
            )
          }
          if (
            !this.grid.walkableAt({
              positionX: node.positionX - 1,
              positionY: node.positionY,
            })
          ) {
            neighbors.push(
              this.grid.nodeAt({
                positionX: node.positionX - 1,
                positionY: node.positionY + dy,
              })
            )
          }
        } else {
          if (
            this.grid.walkableAt({
              positionX: node.positionX + dx,
              positionY: node.positionY,
            })
          ) {
            neighbors.push(
              this.grid.nodeAt({
                positionX: node.positionX + dx,
                positionY: node.positionY,
              })
            )
          }
          if (
            !this.grid.walkableAt({
              positionX: node.positionX,
              positionY: node.positionY + 1,
            })
          ) {
            neighbors.push(
              this.grid.nodeAt({
                positionX: node.positionX + dx,
                positionY: node.positionY + 1,
              })
            )
          }
          if (
            !this.grid.walkableAt({
              positionX: node.positionX,
              positionY: node.positionY - 1,
            })
          ) {
            neighbors.push(
              this.grid.nodeAt({
                positionX: node.positionX + dx,
                positionY: node.positionY - 1,
              })
            )
          }
        }
      }
      return neighbors
    }
  }
}
