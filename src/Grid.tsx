import React, { useEffect, useState } from 'react'
import { parseMap } from './utils/readMap'
import { Flex, Heading, Image } from '@chakra-ui/core'

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
      {map?.height ? (
        <Flex flexDir='column' h='100%' flex={1}>
          Map properties:
          <p>Height {map?.height}</p>
          <p>Width {map?.width}</p>
          <Heading as='h3' size='lg'>
            Maze preview
          </Heading>
          <Flex flexDir='row'>
            <Image src={`maps/images/${mapName.split('.')[0]}.png`} />
          </Flex>
        </Flex>
      ) : (
        <div />
      )}
    </div>
  )
}

export default Grid
