import React from 'react';
import { Box} from '@mui/material';
import NavBar from './Navbar';
import { intro } from '@/context/firebaseDataContext';


const MainPage: React.FC<{introData: intro[]}> = ({introData}) => {

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(23, 19, 20)',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${introData[0].logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}    >
      <NavBar />

    </Box>
  );
};

export default MainPage;
