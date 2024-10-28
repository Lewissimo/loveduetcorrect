import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip, Zoom, Popover, Button, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const StickyIcons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [phoneAnchorEl, setPhoneAnchorEl] = useState<null | HTMLElement>(null);

  const [emailAnchorEl, setEmailAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(document.body.scrollTop > 800);
      console.log('document.body.scrollTop:', document.body.scrollTop);
    };


    document.querySelector('body')?.addEventListener('scroll', handleScroll);


    return () => {
      document.querySelector('body')?.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const handlePhoneClick = (event: React.MouseEvent<HTMLElement>) => {
    setPhoneAnchorEl(event.currentTarget);
  };

  const handlePhoneClose = () => {
    setPhoneAnchorEl(null);
  };

  const phoneOpen = Boolean(phoneAnchorEl);
  const phoneId = phoneOpen ? 'phone-popover' : undefined;

  const handleEmailClick = (event: React.MouseEvent<HTMLElement>) => {
    setEmailAnchorEl(event.currentTarget);
  };

  const handleEmailClose = () => {
    setEmailAnchorEl(null);
  };

  const emailOpen = Boolean(emailAnchorEl);
  const emailId = emailOpen ? 'email-popover' : undefined;

  const handleCall = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:792 077 279';
    }
  };

  const handleCopyPhone = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('792 077 279');
      alert('Numer telefonu został skopiowany!');
    }
  };

  const handleEmail = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'mailto:pawelwisnar.operetka@int.pl';
    }
  };

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('pawelwisnar.operetka@int.pl');
      alert('Adres email został skopiowany!');
    }
  };

  const handleScrollTopClick = () => {
    if (typeof window !== 'undefined') {
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0px',
        right: '16px',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: '16px',
        zIndex: 1000,
      }}
    >
      {showScrollTop && (
        <Tooltip title="Przescroluj na górę" placement="left" TransitionComponent={Zoom}>
          <IconButton
            href='#'
            onClick={handleScrollTopClick}
            sx={{
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'gray' },
              animation: '.4s showAnim forwards',
              transform: 'translateY(40px)'

            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Telefon" placement="left" TransitionComponent={Zoom}>
        <IconButton
          onClick={handlePhoneClick}
          sx={{
            backgroundColor: 'white',
          
            '&:hover': { backgroundColor: 'gray' },
            animation: '.4s .3s showAnim forwards',
            transform: 'translateY(40px)'


          }}
        >
          <PhoneIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={phoneId}
        open={phoneOpen}
        anchorEl={phoneAnchorEl}
        onClose={handlePhoneClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1">792 077 279</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Button variant="contained" color="primary" onClick={handleCall} sx={{ mb: 1 }}>
              Zadzwoń
            </Button>
            <Button variant="outlined" onClick={handleCopyPhone}>
              Skopiuj
            </Button>
          </Box>
        </Box>
      </Popover>

      <Tooltip title="Email" placement="left" TransitionComponent={Zoom}>
        <IconButton
          onClick={handleEmailClick}
          sx={{
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'gray' },
            animation: '.4s showAnim forwards',
            transform: 'translateY(40px)'


          }}
        >
          <EmailIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={emailId}
        open={emailOpen}
        anchorEl={emailAnchorEl}
        onClose={handleEmailClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1">pawelwisnar.operetka@int.pl</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Button variant="contained" color="primary" onClick={handleEmail} sx={{ mb: 1 }}>
              Napisz
            </Button>
            <Button variant="outlined" onClick={handleCopyEmail}>
              Skopiuj
            </Button>
          </Box>
        </Box>
      </Popover>


    </Box>
  );
};

export default StickyIcons;
