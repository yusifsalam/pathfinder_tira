/**
 * Helper function that reads in data from the map
 * @param mapName name of the map to be read in
 */
const readMap = async (mapName: String) => {
  if (mapName === '') return null
  const data = await import(`../maps/${mapName}.ts`)

  return data.default
}

/**
 * Parses the map object
 * @param mapName name of the map to be read in
 */
export const parseMap = async (mapName: String): Promise<MapObject> => {
  const mapText = await readMap(mapName)
  if (!mapText) return null
  const parts = mapText.split('\n')
  const type = parts.shift()!.split(' ')[1]
  const height = parseInt(parts.shift()!.split(' ')[1])
  const width = parseInt(parts.shift()!.split(' ')[1])
  parts.shift()

  const grid = parts.flatMap((line, i) =>
    line.split('').map((char, j) => [i, j, char === '@' ? 1 : 0])
  )

  const mapObject = {
    type,
    height,
    width,
    grid,
  }
  return mapObject
}
