import data from '../maps/allMaps'
/**
 * Reads in the list containing all available maps
 */
export const listMaps = async (): Promise<{ maps: MapFile[] }> => {
  return data
}
