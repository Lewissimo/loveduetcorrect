import React, { useState } from 'react';
import GallerySlider from './GalerySlider';
import { Box, Grid } from '@mui/material';

const Galery = () => {
  const [type, setType] = useState<"scene" | 'studio' | null>(null);
  
  return (
    <Box id='galery' minHeight={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} position={'relative'}>
      {type ? (
        type === 'scene' ? (
          <GallerySlider type={'scene'} backFunction={() => setType(null)} />
        ) : (
          <GallerySlider type={'studio'} backFunction={() => setType(null)} />
        )
      ) : (
        <Grid container sx={{fontSize: '3em', cursor: 'pointer'}}>
          <Grid xs={12} sm={6} onClick={() => setType('scene')} item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{
              '&:hover': {
                textDecoration: 'underline'
              }
            }}>Scena</Box>
          </Grid>
          <Grid xs={12} sm={6} onClick={() => setType('studio')} item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{
              '&:hover': {
                textDecoration: 'underline'
              }
            }}>Studio</Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Galery;
