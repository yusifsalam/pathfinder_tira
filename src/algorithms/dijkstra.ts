import { AStar } from './astar'
import { Heuristic } from '../types'
import { AStarParams } from './astar'

export class Dijkstra extends AStar {
  constructor(params: AStarParams) {
    super({ ...params, heuristic: Heuristic.Zero })
  }
}
