import React, { useEffect, useState } from 'react'
import { parseMap } from './utils/readMap'
import {
  Flex,
  Heading,
  Image,
  Button,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Select,
  ListItem,
  UnorderedList,
} from '@chakra-ui/core'
import { AStar } from './astar/astar'
import { Dijkstra } from './astar/dijkstra'
import { MapObject, Heuristic } from './types'

interface GridProps {
  mapName: String
}

interface GridPoint {
  x: number
  y: number
}

enum Algorithm {
  Dijkstra = 'dijkstra',
  AStar = 'astar',
}

const Grid: React.FC<GridProps> = ({ mapName }) => {
  const [map, setMap] = useState<null | MapObject>(null)
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.AStar)
  const [startPosition, setStartPosition] = useState<GridPoint>({ x: 0, y: 0 })
  const [endPosition, setEndPosition] = useState<GridPoint>({ x: 0, y: 0 })
  const [errors, setErrors] = useState<String[]>([])

  useEffect(() => {
    const getMapObject = async () => {
      const mapObject = await parseMap(mapName)
      setMap(mapObject)
    }
    getMapObject()
  }, [mapName, setMap])

  const startPathSearch = (alg: Algorithm) => {
    if (alg === Algorithm.AStar) runAStar()
    else if (alg === Algorithm.Dijkstra) runDijkstra()
  }

  const runAStar = () => {
    const aStar = new AStar({
      grid: map.grid,
      height: map.height,
      width: map.width,
      heuristic: Heuristic.Manhattan,
    })
    const aStart = Date.now()
    const res = aStar.findPath(
      { positionX: startPosition.x, positionY: startPosition.y },
      { positionX: endPosition.x, positionY: endPosition.y }
    )
    const aEnd = Date.now()
    console.log('aStar', aStar)
    console.log('path', res)
    console.log(`Astar took ${aEnd - aStart} milleseconds`)
  }

  const runDijkstra = () => {
    const dij = new Dijkstra({
      grid: map.grid,
      height: map.height,
      width: map.width,
    })
    const dijStart = Date.now()
    const resD = dij.findPath(
      { positionX: startPosition.x, positionY: startPosition.y },
      { positionX: endPosition.x, positionY: endPosition.y }
    )
    const dijEnd = Date.now()

    console.log('dij', dij)
    console.log('path Dij', resD)
    console.log(`Dijkstra took ${dijEnd - dijStart} milliseconds`)
  }

  return (
    <div>
      {map?.height ? (
        <Flex flexDir='column' h='100%' flex={1}>
          <Flex>
            <UnorderedList>
              {errors.map((err) => (
                <div>
                  <ListItem color='tomato'>{err}</ListItem>
                </div>
              ))}
            </UnorderedList>
          </Flex>
          <Flex>
            <NumberInput
              max={map.width}
              min={0}
              maxW={250}
              keepWithinRange={false}
              clampValueOnBlur={false}
              onChange={(value) => {
                setStartPosition({ ...startPosition, x: parseInt(value) })
                const val = parseInt(value)
                const errText = 'Start X invalid'
                if (val < 0 || val > map.width) {
                  if (!errors.includes(errText)) setErrors([...errors, errText])
                } else setErrors(errors.filter((er) => er !== errText))
              }}
            >
              <NumberInputField
                placeholder='Start X position'
                value={startPosition.x}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <NumberInput
              max={map.height}
              min={0}
              maxW={250}
              keepWithinRange={false}
              clampValueOnBlur={false}
              onChange={(value) => {
                setStartPosition({ ...startPosition, y: parseInt(value) })
                const val = parseInt(value)
                const errText = 'Start Y invalid'
                if (val < 0 || val > map.height) {
                  if (!errors.includes(errText)) setErrors([...errors, errText])
                } else setErrors(errors.filter((er) => er !== errText))
              }}
            >
              <NumberInputField
                placeholder='Start node Y position'
                value={startPosition.y}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex>
            <NumberInput
              max={map.width}
              min={0}
              maxW={250}
              keepWithinRange={false}
              clampValueOnBlur={false}
              onChange={(value) => {
                setEndPosition({ ...endPosition, x: parseInt(value) })
                const val = parseInt(value)
                const errText = 'Destination X invalid'
                if (val < 0 || val > map.width) {
                  if (!errors.includes(errText)) setErrors([...errors, errText])
                } else setErrors(errors.filter((er) => er !== errText))
              }}
            >
              <NumberInputField
                placeholder='Destination X position'
                value={endPosition.x}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <NumberInput
              max={map.height}
              min={0}
              maxW={250}
              keepWithinRange={false}
              clampValueOnBlur={false}
              onChange={(value) => {
                setEndPosition({ ...endPosition, y: parseInt(value) })
                const val = parseInt(value)
                const errText = 'Destination Y invalid'
                if (val < 0 || val > map.height) {
                  if (!errors.includes(errText)) setErrors([...errors, errText])
                } else setErrors(errors.filter((er) => er !== errText))
              }}
            >
              <NumberInputField
                placeholder='Destination Y position'
                value={endPosition.y}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex>
            <Select
              placeholder='Select algorithm'
              onChange={(e) => setAlgorithm(Algorithm[e.target.value])}
              maxW={300}
            >
              {Object.keys(Algorithm).map((a) => (
                <option value={a} key={a}>
                  {a}
                </option>
              ))}
            </Select>
          </Flex>
          <Button
            maxW={300}
            disabled={errors.length !== 0}
            onClick={() => startPathSearch(algorithm)}
          >
            Start
          </Button>
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
