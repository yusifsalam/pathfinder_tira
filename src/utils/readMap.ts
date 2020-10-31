export const readMap = async (mapName: String) => {
  const text = await fetch(`maps/${mapName}`)
  return await text.text()
}

export const parseMap = async (mapName: String): Promise<MapObject> => {
  const mapText = await readMap(mapName)
  const parts = mapText.split('\n')
  const type = parts.shift()!.split(' ')[1]
  const height = parseInt(parts.shift()!.split(' ')[1])
  const width = parseInt(parts.shift()!.split(' ')[1])
  parts.shift()
  parts.pop()
  const grid = parts.map((part) => part.split(''))
  const mapObject = {
    type,
    height,
    width,
    grid,
  }
  return mapObject
}
