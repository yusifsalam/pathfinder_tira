/// <reference types="react-scripts" />

interface MapObject {
  type: string
  height: number
  width: number
  grid: number[][]
}

interface MapFile {
  file: string
  name: string
}

interface IPoint {
  positionX: number
  positionY: number
}

interface INodeConstructor extends IPoint {
  id: number
  isWalkable?: boolean
}
