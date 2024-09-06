import React from 'react';
import { Box} from '@mui/material';
import NavBar from './Navbar';


const MainPage: React.FC = () => {

  return (
    <Box
sx={{
  backgroundColor: 'rgb(23, 19, 20)',
  width: '100%',
  height: '100vh',
  backgroundImage: 'url(/LOGO2.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
}}    >
      <NavBar />

    </Box>
  );
};

export default MainPage;
