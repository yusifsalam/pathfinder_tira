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
}
