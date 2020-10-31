import React from 'react'
import { ChakraProvider } from '@chakra-ui/core'
import Grid from './Grid'

function App() {
  return (
    <ChakraProvider>
      <div>
        Hello world
        <Grid mapName={'maze512-1-0.map'} />
      </div>
    </ChakraProvider>
  )
}

export default App
