import React, { useState } from 'react';
import { Box, Typography, Avatar, Modal, Button } from '@mui/material';

interface MusiacianDescriptionProps {
  name: string;
  text: string;
  photo: string;
  instrument: string;
}

const MusiacianDescription: React.FC<MusiacianDescriptionProps> = ({
  name,
  text,
  photo,
  instrument,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        component="article"
        onClick={handleOpen}
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={2}
        border="1px solid grey"
        borderRadius={4}
        width={300}
        sx={{
          outline: 'none',
          border: 'none',
          transition: '.5s',
          '&:hover': {
            backgroundColor: '#f4f4f4',
            color: 'black',
            cursor: 'pointer',
          },
        }}
      >
        <Avatar
          src={photo}
          alt={`Zdjęcie ${name}`}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h6" mt={2}>
          {name}
        </Typography>
        <Typography variant="body1">{instrument}</Typography>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={`modal-title-${name}`}
        aria-describedby={`modal-description-${name}`}
      >
        <Box
          component="section"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: 'translate(-50%, -50%)',
            color: 'white',
            outline: 'none',
            bgcolor: 'rgba(0, 0, 0, .6)',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id={`modal-title-${name}`}
            variant="h6"
            component="h2"
            gutterBottom
          >
            {name}
          </Typography>
          <Typography
            id={`modal-description-${name}`}
            sx={{ mt: 2, whiteSpace: 'pre-wrap' }}
          >
            {text}
          </Typography>
          <Button
            onClick={handleClose}
            sx={{ mt: 2, color: 'black', backgroundColor: 'white' }}
          >
            Zamknij
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MusiacianDescription;
