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
  ListItem,
  UnorderedList,
} from '@chakra-ui/core'
import { AStar } from './astar/astar'
import { MapObject, Heuristic } from './types'

interface GridProps {
  mapName: String
}

interface GridPoint {
  x: number
  y: number
}

const Grid: React.FC<GridProps> = ({ mapName }) => {
  const [map, setMap] = useState<null | MapObject>(null)
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

  const startPathSearch = () => {
    const aStar = new AStar({
      grid: map.grid,
      height: map.height,
      width: map.width,
      heuristic: Heuristic.Octile,
    })

    const res = aStar.findPath(
      { positionX: startPosition.x, positionY: startPosition.y },
      { positionX: endPosition.x, positionY: endPosition.y }
    )
    console.log('aStar', aStar)
    console.log('path', res)
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
          <Button
            maxW={300}
            disabled={errors.length !== 0}
            onClick={startPathSearch}
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
