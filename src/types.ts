export interface MapObject {
  type: string
  height: number
  width: number
  grid: number[][]
}

export interface MapFile {
  file: string
  name: string
}

export interface IPoint {
  positionX: number
  positionY: number
}

export interface INodeConstructor extends IPoint {
  id: number
  isWalkable?: boolean
}

export enum Heuristic {
  Manhattan = 'manhattan',
  Octile = 'octile',
  Zero = 'zero',
}

export type JumpPoint = IPoint | null
