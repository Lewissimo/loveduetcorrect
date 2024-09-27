import { intro } from '@/context/dataTypes';
import { Box } from '@mui/material';
import React from 'react';

const PhotoComponent: React.FC<{ introData: intro[] }> = ({ introData }) => {
  const backgroundImageUrl = introData.length > 0 ? introData[0].portrait : '';

  return (
    <Box
      sx={{
        height: { sm: '70vh', xs: '300px' },
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundPositionY: 'top',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        backgroundColor: 'rgb(23, 19, 20)',
      }}
    >
    </Box>
  );
};

export default PhotoComponent;
