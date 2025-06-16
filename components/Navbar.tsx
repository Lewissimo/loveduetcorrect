import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Facebook as FacebookIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuLinks = [
    { href: '#home', label: 'Strona Główna' },
    { href: '#about', label: 'O nas' },
    { href: '#offer', label: 'Oferta' },
    { href: '#artist', label: 'Artyści' },
    { href: '#gallery', label: 'Galeria' },
    { href: '#movies', label: 'Filmy' },
    { href: '#contact', label: 'Kontakt' },
    {
      href: 'https://www.bilety24.pl/szukaj?search=Zagadka+tenora&submit=',
      label: 'Bilety',
      external: true,
    },

  ];

  const socialLinks = [
    {
      href: 'https://www.facebook.com/profile.php?id=61557994065108',
      icon: <FacebookIcon />,
      label: 'Facebook',
    },
    {
      href: 'https://www.youtube.com/@pawelwytrazek2005/videos',
      icon: <YouTubeIcon />,
      label: 'YouTube',
    },
    {
      href: 'https://www.weselezklasa.pl/ogloszenia-weselne/love-duet-ritzwisnar,60345/',
      icon: <>
              <Image src={'/weszkl.png'} width={200} height={40} alt='' style={{borderRadius: '25px'}}/>
            </>,
      label: 'Wesele z klasą'
    }
  ];

  const menuItems = (
    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
      {menuLinks.map((link) => (
        <Button
          key={link.label}
          component={Link}
          href={link.href}
          color="inherit"
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          sx={{ textTransform: 'none' }}
        >
          {link.label}
        </Button>
      ))}
      {socialLinks.map((link) => (
        <IconButton
          key={link.label}
          color="inherit"
          component="a"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          {link.icon}
        </IconButton>
      ))}
    </Box>
  );

  const drawerItems = (
    <List>
      {menuLinks.map((link) => (
        <ListItem disablePadding key={link.label}>
          <ListItemButton
            component="a"
            href={link.href}
            onClick={handleDrawerToggle}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
          >
            <ListItemText primary={link.label} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem>
        {socialLinks.map((link) => (
          <IconButton
            key={link.label}
            color="inherit"
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            {link.icon}
          </IconButton>
        ))}
      </ListItem>
    </List>
  );

  return (
    <AppBar component="nav" position="static" color="transparent" elevation={0} id="home">
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
              aria-label="Otwórz menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerItems}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
