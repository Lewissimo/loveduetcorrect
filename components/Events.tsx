import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { eventsType, offerType } from '@/context/dataTypes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Events: React.FC<{ eventsData: eventsType[]; offerData: offerType[] }> = ({
  eventsData,
  offerData,
}) => {
  const [events, setEvents] = useState<eventsType[]>([]);

  useEffect(() => {
    // Sortujemy wydarzenia bez mutowania oryginalnej tablicy
    const sortedEvents = [...eventsData].sort((a, b) => a.order - b.order);
    setEvents(sortedEvents);
  }, [eventsData]);

  const handleDownloadOffer = () => {
    if (offerData.length > 0 && offerData[0].pathPDF) {
      const link = document.createElement('a');
      link.href = offerData[0].pathPDF;
      link.setAttribute('download', 'Oferta_Love_Duet.pdf');
      link.click();
    } else {
      console.warn('Path to PDF is missing.');
    }
  };

  return (
    <Box id="offer" component="section">
      <Grid
        container
        minHeight="100vh"
        sx={{ animation: '1s showAnim forwards', my: '50px' }}
      >
        {/* --- LEWA STRONA – WYDARZENIA --- */}
        {events.length > 0 && (
          <Grid
            item
            xs={12}
            lg={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                bgcolor: 'rgba(23, 19, 20, .7)',
                margin: '8px',
                borderRadius: '25px',
                padding: '20px',
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom color="white">
                Zobacz najbliższe wydarzenia:
              </Typography>
              <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                {events.map((item, index) => (
                  <ListItemButton
                    key={index}
                    component="a"
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      color: 'white',
                    }}
                  >
                    <ListItemText
                      primary={<Typography sx={{ color: 'white' }}>{item.name}</Typography>}
                      secondary={
                        <>
                          <Typography sx={{ color: 'white' }}>Data: {item.date}</Typography>
                          <Typography sx={{ color: 'white' }}>
                            Lokalizacja: {item.place}
                          </Typography>
                        </>
                      }
                    />
                    <ArrowForwardIosIcon sx={{ color: 'white' }} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Grid>
        )}

        {/* --- PRAWA STRONA – OFERTA --- */}
        {offerData.length > 0 && (
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                textAlign: 'center',
                margin: '8px',
                borderRadius: '5px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom color="white">
                Zobacz ofertę
              </Typography>

              {/* Zdjęcie pobierane z danych oferty */}
              <Box
                component="img"
                sx={{
                  maxHeight: '300px',
                  maxWidth: '100%',
                  marginBottom: '20px',
                  borderRadius: '25px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                alt="Oferta Love Duet"
                src={offerData[0].photoPath || '/default-image.jpg'}
              />

              {/* Przyciski */}
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: '25px' }}
                onClick={handleDownloadOffer}
              >
                Pobierz ofertę
              </Button>

              {/* NOWA SEKCJA – PROFIL NA WESELE Z KLASĄ */}
              <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.3)', width: '80%' }} />
              <Typography variant="h5" component="h3" gutterBottom color="white">
                Sprawdź nasz profil w Wesele z Klasą:
              </Typography>
              <Link
                href="https://www.weselezklasa.pl/ogloszenia-weselne/love-duet-ritzwisnar,60345/"
                passHref
                target='_black'
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '25px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform .3s',
                    '&:hover': { transform: 'scale(1.03)' },
                  }}
                >
                  <Image
                    src="/weszkl.png"
                    alt="Love Duet – profil na Wesele z Klasą"
                    width={400}
                    height={250}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </Box>
              </Link>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Events;
