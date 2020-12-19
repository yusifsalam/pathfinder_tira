import { parseMap } from '../src/helpers/readMap'
import { listMaps } from '../src/helpers/listMaps'

describe('Testing reading in map data', () => {
  it('map list is correct', () => {
    return listMaps().then((res) => {
      expect(res.maps[0].name).toStrictEqual('Maze 0-0')
    })
  })

  it('map is read correctly', () => {
    return parseMap('maze32-0-0').then((mapObject) => {
      expect(mapObject.grid[0]).toStrictEqual([0, 0, 1])
      expect(mapObject.grid[1023]).toStrictEqual([31, 31, 1])
    })
  })
})
