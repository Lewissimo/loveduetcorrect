import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AboutDetails = ({
  title,
  text,
  backFunction,
}: {
  title: string;
  text: string[];
  backFunction: (value: boolean) => void;
}) => {
  return (
    <Box
      component="section"
      sx={{
        width: 'clamp(300px, 90%, 800px)',
        margin: 'auto',
        padding: '20px',
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => backFunction(false)}
        sx={{
          marginBottom: '20px',
          textTransform: 'none',
        }}
      >
        Wróć
      </Button>
      <Typography component="h3" variant="h5" sx={{ marginBottom: '12px' }}>
        {title}
      </Typography>
      {text.map((element, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{ color: '#666', lineHeight: '1.5', marginTop: '10px' }}
        >
          {element}
        </Typography>
      ))}
    </Box>
  );
};

export default AboutDetails;
