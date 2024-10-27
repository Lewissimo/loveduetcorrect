import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { intro } from '@/context/dataTypes';

const PhotoComponent: React.FC<{ introData: intro[] }> = ({ introData }) => {
  const backgroundImageUrl = introData.length > 0 ? introData[0].portrait : '';

  return (
    <Box
      component="section"
      sx={{
        height: { sm: '70vh', xs: '300px' },
        backgroundColor: 'rgb(23, 19, 20)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt="Love Duet - Dorota Ritz i Paweł Wisnar"
          layout="fill"
          objectFit="contain"
          objectPosition="top center"
          priority
        />
      )}
      <Typography
        component="h2"
        variant="h2"
        sx={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          border: 0,
        }}
      >
        Love Duet - Dorota Ritz i Paweł Wisnar - Zdjęcie promocyjne
      </Typography>
    </Box>
  );
};

export default PhotoComponent;
