import { Box, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { ReactNode } from 'react';

const OfferDetails = ({ title, date, paragraphs, photo, backFunction }: { title: string, date: string, paragraphs: string[], photo: string | null, backFunction: (value: ReactNode | null) => void }) => {
  return (
    <Box
      width="clamp(300px, 80%, 900px)"
      mx="auto"
      p={3}
      borderRadius={4}
      boxShadow={3}
    >
      <IconButton onClick={() => { backFunction(null); }} aria-label="back">
        <ArrowBackIcon sx={{color: 'white'}} />
      </IconButton>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="subtitle1">
          {date}
        </Typography>
      </Box>
      {photo && (
        <Box mt={3}>
          <Image
            src={photo}
            alt={title}
            width={400}
            height={600}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>
      )}
      <Box mt={3}>
        {paragraphs.map((paragraph, index) => (
          <Typography key={index} variant="body1" paragraph>
            {paragraph}
          </Typography>
        ))}
      </Box>

    </Box>
  );
};

export default OfferDetails;
