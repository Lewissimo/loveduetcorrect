import React from 'react';
import { Box } from '@mui/material';
import NavBar from './Navbar';
import { intro } from '@/context/dataTypes';

const MainPage: React.FC<{ introData: intro[] }> = ({ introData }) => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: 'rgb(23, 19, 20)',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${introData[0]?.logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <NavBar />
      <Box
        component="h1"
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
        Love Duet - Dorota Ritz i Paweł Wisnar | Warszawski Duet Operetkowy
      </Box>
    </Box>
  );
};

export default MainPage;
