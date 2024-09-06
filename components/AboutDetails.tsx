import { Box, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AboutDetails = ({
  title,
  text,
  backFunction
}: {
  title: string;
  text: string[];
  backFunction: (value: boolean) => void;
}) => {
  return (
    <Box sx={{
      width: 'clamp(300px, 90%, 800px)',
      margin: 'auto',
      padding: '20px',

    }}>
      <Box sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
      
      }} onClick={() => backFunction(false)}>
        <ArrowBackIcon sx={{ marginRight: '8px' }} />
        <Typography variant="subtitle1">Wróć</Typography>
      </Box>
      <Typography variant='h2' sx={{ marginBottom: '12px' }}>{title}</Typography>
      {
        text.map((element, index) => (
          <Typography key={index} variant='body2' sx={{ color: '#666', lineHeight: '1.5', marginTop: '10px' }}>
            {element}
          </Typography>
        ))
      }
    </Box>
  )
}

export default AboutDetails;
