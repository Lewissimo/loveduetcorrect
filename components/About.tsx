import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AboutDetails from './AboutDetails';
import { section_ } from './exData';

type section = {
  title: string;
  textIntroParagraphs: string[];
  textDetailsParagraphs: string[];
}



const About: React.FC = () => {
  const [sections, setSections] = useState<section[]>([]);
  const [details, setDetails] = useState<ReactNode | null>(null);

  useEffect(()=>{
    setSections(section_);
  }, [section_]);

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
          sections.map((element, index) => (

        <Grid key={index} item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {element.title}
          </Typography>
          {
            element.textIntroParagraphs.map(element => (

          <Typography variant="body1" paragraph key={index}>
            {element}
          </Typography>
            ))
          }
          <span style={{color: 'blue', cursor: 'pointer'}} onClick={()=>{setDetails(<AboutDetails title={element.title} text={element.textDetailsParagraphs} backFunction={handleCheckDetails}/>)}}>...więcej</span>
        </Grid>
          ))
        }
       
      </Grid>
        }
    </Box>
  );
};

export default About;
