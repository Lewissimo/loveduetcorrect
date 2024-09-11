import React, { useState } from 'react';
import GallerySlider from './GalerySlider';
import { Box, Grid, Button } from '@mui/material';
import { galeryType } from '@/context/firebaseDataContext';

const Galery:React.FC<{ galeryData: galeryType[] }> = ({galeryData}) => {
  const [type, setType] = useState<number | null>(null);
  
  return (
    <Box id='gallery' minHeight={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} position={'relative'}>
      {
        type !== null ? <GallerySlider data={galeryData[type].paths} backFunction={setType} />
        :
        galeryData.map((element, index) => (
  
          <Grid container spacing={2} key={index} sx={{ fontSize: '1.9em', cursor: 'pointer' }}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setType(index)}
              sx={{ fontSize: '1.2em', width: '300px' }}
              >
              {element.name}
            </Button>
          </Grid>
        </Grid>
        ))
            } 
    </Box>
  );
};

export default Galery;
