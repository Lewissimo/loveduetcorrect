import { Box, Typography, Card, CardContent, Modal, IconButton, Grid } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface PersonCardProps {
  photo: string;
  name: string;
  role: string;
  description: string;
  email?: string;
  phone?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ photo, name, role, description, email, phone }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 4,
          bgcolor: '#fafafa',
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: {
              xs: 'column', // Stack on small screens
              sm: 'row', // Side-by-side on larger screens
            },
          }}
        >
          <Grid item xs={12} sm={4}>
            <Box
              component="img"
              src={photo}
              alt={name}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: 1,
              }}
              onClick={handleOpen}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography variant="h4" component="div">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                {role}
              </Typography>

              {email && (
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  📧 Email: {email}
                </Typography>
              )}
              {phone && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  📞 Telefon: {phone}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="photo-modal-title"
        aria-describedby="photo-modal-description"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            height: '90vh',
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            outline: 'none',
            borderRadius: 2,
            overflow: 'hidden',
            p: 2,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={photo}
            alt={name}
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default PersonCard;
