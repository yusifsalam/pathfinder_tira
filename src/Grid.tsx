import React, { useEffect, useState } from 'react'
import { parseMap } from './utils/readMap'

interface GridProps {
  mapName: String
}

const Grid: React.FC<GridProps> = ({ mapName }) => {
  const [map, setMap] = useState<null | MapObject>(null)

  useEffect(() => {
    const getText = async () => {
      const mapText = await parseMap(mapName)
      setMap(mapText)
    }
    getText()
  }, [mapName, setMap])

  return (
    <div>
      Map properties:
      <p>Height {map?.height}</p>
      <p>Width {map?.width}</p>
    </div>
  )
}

export default Grid
