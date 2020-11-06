import React, { SyntheticEvent, useEffect, useState } from 'react'
import Grid from './Grid'
import { Flex, Select, Heading } from '@chakra-ui/core'
import { listMaps } from './utils/listMaps'

interface MapFile {
  file: string
  name: string
}

function App() {
  const [selectedMap, setSelectedMap] = useState('')
  const [mapList, setMapList] = useState<null | [MapFile]>(null)
  useEffect(() => {
    const getMaps = async () => {
      const data = await listMaps()
      const maps = data.maps as [MapFile]
      setMapList(maps)
    }
    getMaps()
  }, [setMapList])

  const handleSelectChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setSelectedMap(target.value)
  }
  return (
    <Flex p={5} flexDir='column' maxH='100vh'>
      <Heading>Pathfinding algorithm comparison</Heading>
      <Select
        pt={2}
        pb={2}
        w={'50%'}
        placeholder='Select map'
        onChange={handleSelectChange}
      >
        {mapList?.map((m) => (
          <option value={m.file} key={m.name}>
            {m.name}
          </option>
        ))}
      </Select>
      <Grid mapName={selectedMap} />
    </Flex>
  )
}

export default App
