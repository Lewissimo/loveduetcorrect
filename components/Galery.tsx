import React from 'react'
import GallerySlider from './GalerySlider'
import { Box } from '@mui/material'

const Galery = () => {
  return (
    <Box id='galery' minHeight={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} >
      <GallerySlider />
      </Box>
  )
}

export default Galery