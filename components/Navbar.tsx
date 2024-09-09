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
    <Box sx={{ color: 'white' }}>
      <Link href="#home" passHref>
        <Button color="inherit">Home</Button>
      </Link>
      <Link href="#offer" passHref>
        <Button color="inherit">Oferta</Button>
      </Link>

      <Link href="#about" passHref>
        <Button color="inherit">O nas</Button>
      </Link>

      <Link href="#artist" passHref>
        <Button color="inherit">Artyści</Button>
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
    <AppBar position="static" color="transparent" elevation={0} id="home">
      <Toolbar>
        {!isMobile ? (
          <Box display="flex" justifyContent="flex-start" sx={{ gap: 2 }}>
            {menuItems}
          </Box>
        ) : (
          <Box sx={{ ml: 'auto' }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <Link href="#home" passHref>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href="#offer" passHref>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemText primary="Oferta" />
            </ListItem>
          </Link>
          <Link href="#about" passHref>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemText primary="O nas" />
            </ListItem>
          </Link>
          <Link href="#artist" passHref>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemText primary="Artyści" />
            </ListItem>
          </Link>
          <Link href="#gallery" passHref>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemText primary="Galeria" />
            </ListItem>
          </Link>
          <Link href="#movies" passHref>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemText primary="Filmy" />
            </ListItem>
          </Link>
          <Link href="#contact" passHref>
            <ListItem onClick={handleDrawerToggle}>
              <ListItemText primary="Kontakt" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
