import React, { useEffect, useState } from 'react'
import { parseMap } from '../helpers/readMap'
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
import { AStar } from '../algorithms/astar'
import { Dijkstra } from '../algorithms/dijkstra'
import { MapObject, Result } from '../types'
import { JPS } from '../algorithms/jps'
import Chart from './Chart'

interface AlgorithmsProps {
  mapName: String
}

interface GridPoint {
  x: number
  y: number
}

enum Algorithm {
  Dijkstra = 'dijkstra',
  AStar = 'astar',
  JPS = 'jps',
}

const Algorithms: React.FC<AlgorithmsProps> = ({ mapName }) => {
  const [map, setMap] = useState<null | MapObject>(null)
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.AStar)
  const [startPosition, setStartPosition] = useState<GridPoint>({ x: 0, y: 0 })
  const [endPosition, setEndPosition] = useState<GridPoint>({ x: 0, y: 0 })
  const [errors, setErrors] = useState<String[]>([])
  const [output, setOutput] = useState<String>('')
  const [showPreview, setShowPreview] = useState(true)
  const [showRender, setShowRender] = useState(false)

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
    else if (alg === Algorithm.JPS) runJPS()
  }

  const runAStar = () => {
    const aStar = new AStar({
      grid: map.grid,
      height: map.height,
      width: map.width,
    })
    const aStart = Date.now()
    const res: Result = aStar.findPath(
      { positionX: startPosition.x, positionY: startPosition.y },
      { positionX: endPosition.x, positionY: endPosition.y }
    )
    const aEnd = Date.now()
    console.log('A*', aStar)
    console.log('reitti', res)
    res.error
      ? setErrors([...errors, res.error])
      : setOutput(`A* took ${aEnd - aStart} milleseconds`)
  }

  const runJPS = () => {
    const jps = new JPS({
      grid: map.grid,
      height: map.height,
      width: map.width,
    })
    const jpsStart = Date.now()
    const res: Result = jps.findPath(
      { positionX: startPosition.x, positionY: startPosition.y },
      { positionX: endPosition.x, positionY: endPosition.y }
    )
    const jpsEnd = Date.now()
    console.log('JPS', jps)
    console.log('reitti', res)
    res.error
      ? setErrors([...errors, res.error])
      : setOutput(`JPS took ${jpsEnd - jpsStart} milliseconds`)
  }

  const runDijkstra = () => {
    const dij = new Dijkstra({
      grid: map.grid,
      height: map.height,
      width: map.width,
    })
    const dijStart = Date.now()
    const res: Result = dij.findPath(
      { positionX: startPosition.x, positionY: startPosition.y },
      { positionX: endPosition.x, positionY: endPosition.y }
    )
    const dijEnd = Date.now()

    console.log('dijktra', dij)
    console.log('reitti', res)
    res.error
      ? setErrors([...errors, res.error])
      : setOutput(`Dijkstra took ${dijEnd - dijStart} milliseconds`)
  }

  return (
    <div>
      {map?.height ? (
        <Flex flexDir='column' h='100%' flex={1}>
          <Flex>
            <UnorderedList>
              {errors.map((err) => (
                <div key={err.toString()}>
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
          <Flex>
            <Button onClick={() => setShowPreview(!showPreview)}>Show preview</Button>
            <Button onClick={() => setShowRender(!showRender)}>Show render (SLOW)</Button>
          </Flex>
          <Heading as='h6' size='m'>
            {output}
          </Heading>
          <Heading as='h3' size='lg'>
            Maze preview
          </Heading>
          { showPreview ? 
          <Flex flexDir='row'>
            <Image src={`maps/images/${mapName.split('.')[0]}.png`} />
          </Flex> : <></> }
          {showRender ? <Chart data={map.grid}/> : <> </> }
        </Flex>
      ) : (
        <div />
      )}
    </div>
  )
}

export default Algorithms
