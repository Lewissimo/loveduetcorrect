import React, { useState } from 'react';
import GallerySlider from './GalerySlider';
import { Box, Grid, Button } from '@mui/material';
import { galeryType } from '@/context/dataTypes';

const Galery: React.FC<{ galeryData: galeryType[] }> = ({ galeryData }) => {
  const [type, setType] = useState<number | null>(null);

  return (
    <Box
      component="section"
      id="gallery"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
    >
      {type !== null ? (
        <GallerySlider data={galeryData[type].paths} backFunction={setType} />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{ fontSize: '1.9em', cursor: 'pointer' }}
        >
          {galeryData.map((element, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                href='#gallery'
                variant="outlined"
                color="primary"
                onClick={() => setType(index)}
                sx={{ fontSize: '1.2em', width: '300px' }}
                aria-label={`Otwórz galerię ${element.name}`}
              >
                {element.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Galery;
