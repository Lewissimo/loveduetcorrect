import { Box, Stack, Container, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PersonCard from './PersonalCard';
import { artistsType } from '@/context/dataTypes';

const Musicians: React.FC<{ artistsData: artistsType[] }> = ({ artistsData }) => {
  const [showMusicians, setShowMusicians] = useState(false);
  const [currentArtists, setCurrentArtists] = useState<artistsType[]>([]);
  useEffect(() => {
    setCurrentArtists(artistsData.sort((a, b) => a.order - b.order));
  }, [artistsData]);

  const toggleMusicians = () => {
    setShowMusicians(prevShow => !prevShow);
  };

  return (
    <Box id='artist' sx={{
      height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#f4f4f4'
      , justifyContent: 'center'
    }}>
      <Box
        sx={{
          width: 'clamp(300px, 100%, 1200px)',
          transition: '1.3s',
          height: showMusicians ? '800px' : '300px',
          maxHeight: '100vh',
          padding: '2rem',
          overflowY: showMusicians ? 'auto' : 'hidden',
          color: 'black', borderRadius: '20px'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            
            gutterBottom
            sx={{
              marginBottom: '2rem',
              fontStyle: 'oblique',
              fontSize: {
                xs: '1.5em',
                lg: '3em'
              }
            }}
          >
            Poznaj naszych artystów i muzyków
          </Typography>

          <Box display="flex" justifyContent="center" mb={4}>
            <Button
            
              variant="outlined"
              color="primary"
              onClick={toggleMusicians}
              fullWidth
              href='#artist'
              sx={{ fontSize: '1.4em', borderRadius: '25px' }}
            >
              {showMusicians ? 'Zwiń' : 'Rozwiń'}
            </Button>
          </Box>

          {showMusicians && (
            <Stack spacing={4}>
              {currentArtists.map((element, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"

                >
                  <PersonCard
                    intro={element.intro}
                    photo={element.photo}
                    name={element.name}
                    role={element.role}
                    description={element.description}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Musicians;
