import React, { useEffect, useState } from 'react';
import GallerySlider from './GaleryEditor';
import { Box, Grid, Button } from '@mui/material';
import { galeryType } from '@/context/dataTypes';



const Galery: React.FC<{ galeryData: galeryType[] }> = ({ galeryData }) => {
  const [type, setType] = useState<number | null>(null);
  const [images, setImages] = useState<galeryType[]>([]);
  useEffect(()=>{
    setImages(galeryData)
  }, [])
  return (
    <Box id='gallery' minHeight={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} position={'relative'}>
      {
        type !== null ? (
          <GallerySlider
            data={images[type].paths}
            backFunction={setType}
            documentId={images[type].id} 
            name={images[type].name}
            setFun={setImages}
          />
        ) : (
          <Grid container spacing={2} sx={{ fontSize: '1.9em', cursor: 'pointer' }}>
            {images.map((element, index) => (
              <Grid item xs={12} key={index} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                  href='#gallery'
                  variant="outlined" 
                  color="primary" 
                  onClick={() => setType(index)}
                  sx={{ fontSize: '1.2em', width: '300px' }}
                >
                  {element.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        )
      }
    </Box>
  );
};

export default Galery;
