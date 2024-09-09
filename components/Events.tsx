import React, { useEffect, useState } from 'react';
import { Box, Grid, List, ListItemButton, ListItemText, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { example } from './exEvents';
interface EventItem {
  eventTitle: string;
  date: string;
  descriptionParagraphs: string[];
  photo: string | null;
}

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    setEvents(example);
  }, []);

  const handleDownloadOffer = () => {
    const link = document.createElement('a');
    link.href = '/offer.pdf';
    link.download = 'offer.pdf';
    link.click();
  };

  return (
    <Box id='offer'>
      <Grid minHeight={'100vh'} container sx={{ animation: '1s showAnim forwards', my: '50px' }}>
        <Grid xs={12} lg={6} item display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Box sx={{ bgcolor: 'rgba(23, 19, 20, .7)', margin: '8px', borderRadius: '5px' }}>
            <Typography variant="h4" gutterBottom>
              Zobacz najbliższe wydarzenia:
            </Typography>
            <List>
              {events.map((item, index) => (
                <ListItemButton
                  key={index}
                  href='https://www.facebook.com/'
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    color: 'white',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ color: 'white' }}>
                        {item.eventTitle}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ color: 'white' }}>
                        Data: {item.date}
                      </Typography>
                    }
                  />
                  <ArrowForwardIosIcon sx={{ color: 'white' }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid xs={12} lg={6} item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Box sx={{ textAlign: 'center', margin: '8px', borderRadius: '5px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Zobacz ofertę
            </Typography>

            <Box
              component="img"
              sx={{
                maxHeight: '300px',
                maxWidth: '100%',
                marginBottom: '20px',
                borderRadius: '5px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              alt="Oferta"
              src="/pdftitle.png"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadOffer}
            >
              Pobierz ofertę
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Events;
