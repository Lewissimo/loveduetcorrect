import React, { useState } from 'react';
import GallerySlider from './GalerySlider';
import { Box, Grid, Button } from '@mui/material';

const Galery = () => {
  const [type, setType] = useState<"scene" | 'studio' | null>(null);
  
  return (
    <Box id='gallery' minHeight={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} position={'relative'}>
      {type ? (
        type === 'scene' ? (
          <GallerySlider type={'scene'} backFunction={() => setType(null)} />
        ) : (
          <GallerySlider type={'studio'} backFunction={() => setType(null)} />
        )
      ) : (
        <Grid container spacing={2} sx={{ fontSize: '1.9em', cursor: 'pointer' }}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setType('scene')}
              sx={{ fontSize: '1.2em', width: '300px' }}
            >
              Scena
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => setType('studio')}
              sx={{ fontSize: '1.2em', width: '300px' }}
            >
              Studio
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Galery;
