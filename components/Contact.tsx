import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import { contactType } from '@/context/firebaseDataContext';

const Contact: React.FC<{ contactData: contactType[] }> = ({contactData}) => {
  return (
    <Box
      id="contact"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: '20px',
      }}
    >
      <Grid container spacing={4} maxWidth="lg">
          {contactData.map((element, index) =>(

            <Grid item xs={12} md={6} key={index}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: '15px',
              padding: '20px',
              backgroundColor: '#ffffff',
            }}
            >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" marginBottom="20px">
                <Box
                  component="img"
                  src={element.photo}
                  alt="photo error"
                  sx={{
                    width: 150,
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '20px',
                  }}
                  />
                <Typography variant="h5" component="div" gutterBottom>
                  {element.name}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" marginBottom="10px">
                <EmailIcon sx={{ marginRight: '10px', color: '#1976d2' }} />
                <Typography variant="body1">
                  <a href={`mailto:${element.mail}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {element.mail}
                  </a>
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" marginBottom="10px">
                <PhoneIcon sx={{ marginRight: '10px', color: '#1976d2' }} />
                <Typography variant="body1">{element.phone}</Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <FacebookIcon sx={{ marginRight: '10px', color: '#3b5998' }} />
                <Typography variant="body1">
                  <a href={element.fbPath} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        ))
             }     
        
      </Grid>
    </Box>
  );
};

export default Contact;
