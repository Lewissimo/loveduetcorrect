import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = (
    <Box  sx={{color:'white'}}>
      <Link href="#home" passHref>
        <Button color="inherit">Home</Button>
      </Link>
      <Link href="#about" passHref>
        <Button color="inherit">O nas</Button>
      </Link>
      <Link href="#offer" passHref>
        <Button color="inherit">Oferta</Button>
      </Link>
      <Link href="#gallery" passHref>
        <Button color="inherit">Galeria</Button>
      </Link>
      <Link href="#movies" passHref>
        <Button color="inherit">Filmy</Button>
      </Link>
      <Link href="#contact" passHref>
        <Button color="inherit">Kontakt</Button>
      </Link>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0} id='home'>
      <Toolbar>
        {!isMobile ? (
          <Box display="flex" justifyContent="flex-start" sx={{ gap: 2 }}>
            {menuItems}
          </Box>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{color: 'white'}} />
          </IconButton>
        )}
      </Toolbar>
      <Drawer anchor="left" sx={{color:'white'}} open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="O nas" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Oferta" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Galeria" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Kontakt" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
