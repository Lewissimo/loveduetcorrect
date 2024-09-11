import React, { ReactNode, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AboutDetails from './AboutDetails';
import Link from 'next/link';
import { aboutType } from '@/context/firebaseDataContext';

const About: React.FC<{ aboutData: aboutType[]; }> = ({aboutData}) => {
  const [details, setDetails] = useState<ReactNode | null>(null);

 
  const handleCheckDetails = (value: ReactNode | null) => { 
    setDetails(value);
  }
  return (
 
    <Box
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
      id='about'
    >
      {details 
      ? 
        <span style={{animation: '1s showAnim forwards'}}>{details}</span>
      :
        <Grid container spacing={4} maxWidth="lg" sx={{animation: '1s showAnim forwards'}}>
        {
          aboutData.map((element, index) => (

        <Grid key={index} item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {element.name}
          </Typography>
          
            

          <Typography variant="body1" paragraph>
            {element.introText}
          </Typography>
            
          
          <Link href={'#about'} style={{color: 'blue', cursor: 'pointer'}} onClick={()=>{setDetails(<AboutDetails title={element.name} text={element.details} backFunction={handleCheckDetails}/>)}}>...więcej</Link>
        </Grid>
          ))
        }
       
      </Grid>
        }
    </Box>
  );
};

export default About;
