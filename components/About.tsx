import React, { ReactNode, useState } from 'react';
import { Box, Grid, Typography, Link as MuiLink } from '@mui/material';
import AboutDetails from './AboutDetails';
import { aboutType } from '@/context/dataTypes';

const About: React.FC<{ aboutData: aboutType[] }> = ({ aboutData }) => {
  const [details, setDetails] = useState<ReactNode | null>(null);

  const handleCheckDetails = (value: ReactNode | null) => {
    setDetails(value);
  };

  return (
    <Box
      component="section"
      id="about"
      sx={{
        color: 'black',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {details ? (
        <Box
          component="div"
          sx={{ animation: '1s showAnim forwards' }}
        >
          {details}
        </Box>
      ) : (
        <Grid
          container
          spacing={4}
          maxWidth="lg"
          sx={{ animation: '1s showAnim forwards' }}
        >
          {aboutData.map((element, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Typography component="h2" variant="h4" gutterBottom>
                {element.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {element.introText}
              </Typography>
              <MuiLink
                href="#about"
                underline="none"
                sx={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => {
                  setDetails(
                    <AboutDetails
                      title={element.name}
                      text={element.details}
                      backFunction={handleCheckDetails}
                    />
                  );
                }}
              >
                ...więcej
              </MuiLink>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default About;
