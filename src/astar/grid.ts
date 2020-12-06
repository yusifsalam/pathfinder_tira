import { Node } from './node'

interface IGridConstructor {
  grid: number[][]
}

export class Grid {
  width: number
  height: number
  grid: Node[][]

  constructor(params: IGridConstructor) {
    this.width = params.grid[0].length
    this.height = params.grid.length
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
          isWalkable: grid[j][i] === 1,
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

  public isInsideGrid(position: IPoint): boolean {
    return (
      position.positionX >= 0 &&
      position.positionX <= this.width &&
      position.positionY >= 0 &&
      position.positionY <= this.height
    )
  }

  /**
   * Return a Node's adjacent Nodes (including diagonal neighbors)
   * @param position Position of the node on the map
   */
  public getNeighbors(position: IPoint): Node[] {
    let neighbors: Node[] = []
    for (let j = position.positionY - 1; j <= position.positionY + 1; j++) {
      for (let i = position.positionX; i <= position.positionX + 1; i++) {
        if (this.isInsideGrid(position) && this.nodeAt(position).isWalkable) {
          neighbors.push(this.nodeAt({ positionX: i, positionY: j }))
        }
      }
    }
    return neighbors
  }
}
