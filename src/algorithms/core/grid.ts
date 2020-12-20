import { Node } from './node'
import { IPoint } from '../../types'

interface IGridConstructor {
  height: number
  width: number
  grid: number[][]
}

export class Grid {
  width: number
  height: number
  grid: Node[][]

  constructor(params: IGridConstructor) {
    this.width = params.width
    this.height = params.height
    this.grid = this.createGrid(this.width, this.height, params.grid)
  }

  /**
   * Creates a new Grid object and fills it with Node objects
   * @param width = grid width
   * @param height = grid height
   * @param grid
   * @private
   */
  private createGrid(
    width: number,
    height: number,
    grid: number[][]
  ): Node[][] {
    const newGrid: Node[][] = []
    let id: number = 0
    for (let j = 0; j < height; j++) {
      newGrid[j] = []
      for (let i = 0; i < width; i++) {
        newGrid[j][i] = new Node({
          id: id,
          positionX: i,
          positionY: j,
          isWalkable: grid[id][2] === 0,
        })
        id++
      }
    }

    return newGrid
  }

  /**
   * Retrieves a Node from a given position
   * @param position Position of the node on the grid
   */
  public nodeAt(position: IPoint) {
    return this.grid[position.positionY][position.positionX]
  }

  public walkableAt(p: IPoint) {
    return this.isInsideGrid(p) && this.nodeAt(p).isWalkable
  }

  public isInsideGrid(position: IPoint): boolean {
    return (
      position.positionX >= 0 &&
      position.positionX < this.width &&
      position.positionY >= 0 &&
      position.positionY < this.height
    )
  }

  /**
   * Return a Node's adjacent Nodes (including diagonal neighbors)
   * @param position Position of the node on the map
   */
  public getNeighbors(position: IPoint): Node[] {
    let neighbors: Node[] = []
    for (let j = position.positionY - 1; j <= position.positionY + 1; j++) {
      for (let i = position.positionX - 1; i <= position.positionX + 1; i++) {
        if (
          this.isInsideGrid({ positionX: i, positionY: j }) &&
          this.nodeAt({ positionX: i, positionY: j })
        ) {
          if (this.nodeAt({ positionX: i, positionY: j }).isWalkable)
            if (!(position.positionX === i && position.positionY === j))
              neighbors.push(this.nodeAt({ positionX: i, positionY: j }))
        }
      }
    }
    return neighbors
  }
}
