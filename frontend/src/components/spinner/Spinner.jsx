import React from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'

const Spinner = () => {
  return (
    <div className='spinner'>
      <Box margin={'28'}>
        <CircularProgress isIndeterminate color='green.300' />
      </Box>
    </div>
  )
}

export default Spinner
