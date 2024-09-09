import { Box } from '@mui/material'
import React from 'react'

const PhotoComponent = () => {
  return (
    <Box    sx={{
        height: {sm: '70vh', xs: '300px'},
        backgroundImage: 'url(/1.jpg)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundPositionY: 'top',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        backgroundColor: 'rgb(23, 19, 20)',
      }}>
    </Box>
  )
}

export default PhotoComponent