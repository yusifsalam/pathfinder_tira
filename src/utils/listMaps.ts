export const listMaps = async () => {
  const res = await fetch('maps/allMaps.json')
  return await res.json()
}
