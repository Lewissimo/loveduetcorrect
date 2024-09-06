import { Box, Stack, Container, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import PersonCard from './PersonalCard';

const musiciansTab = [
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.'
    },
    {
        name: 'Dorota Witz',
        instrument: 'wokal',
        photo: '/photography.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut.Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, utLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit possimus dolorem, error exercitationem culpa nostrum dolorum velit tempora sint nam saepe doloremque magnam porro dignissimos nesciunt illum placeat! Deleniti, ut'
    }

]

const Musicians = () => {
  const [showMusicians, setShowMusicians] = useState(false);

  const toggleMusicians = () => {
    setShowMusicians(prevShow => !prevShow);
  };

  return (
    <Box sx={{        height: '100vh', display: 'flex', alignItems: 'center', bgcolor: 'white', justifyContent: 'center'
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
            }}
            >
          Poznaj naszych muzyków
        </Typography>

        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleMusicians}
            fullWidth
            
            sx={{fontSize: '1.4em', borderRadius: '25px'}}
            >
            {showMusicians ? 'Zwiń' : 'Rozwiń'}
          </Button>
        </Box>

        {showMusicians && (
            <Stack spacing={4}>
            {musiciansTab.map((element, index) => (
                <Box
                key={index}
                display="flex"
                justifyContent="center"
                alignItems="center"
                
                >
                <PersonCard
                  photo={element.photo}
                  name={element.name}
                  role={element.instrument}
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
