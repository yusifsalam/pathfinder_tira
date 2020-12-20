import React from 'react'
import ReactDOM from 'react-dom'
import App from './ui/App'
import { ChakraProvider } from '@chakra-ui/core'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
