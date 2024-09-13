import { Box, Grid, List, ListItemButton, ListItemText, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { eventsType, offerType } from '@/context/firebaseDataContext';


const Events:React.FC<{eventsData: eventsType[], offerData: offerType[]}> = ({eventsData, offerData}) => {


  const handleDownloadOffer = () => {
    if (offerData.length > 1 && offerData[1].pathPDF) {
      const link = document.createElement('a');
      link.href = `${offerData[1].pathPDF}`;
      link.download = `${offerData[1].pathPDF}`;
      link.click();
    } else {
      console.warn('Path to PDF is missing.');
    }
  };
  
  return (
    <Box id='offer'>
      <Grid minHeight={'100vh'} container sx={{ animation: '1s showAnim forwards', my: '50px' }}>
        {/* Event list rendering */}
        {eventsData.length > 0 && (
          <Grid xs={12} lg={6} item display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ bgcolor: 'rgba(23, 19, 20, .7)', margin: '8px', borderRadius: '25px', padding: '20px' }}>
              <Typography variant="h4" gutterBottom color='white'>
                Zobacz najbliższe wydarzenia:
              </Typography>
              <List>
                {eventsData.map((item, index) => (
                  <ListItemButton
                    key={index}
                    href='https://www.facebook.com/'
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      color: 'white',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ color: 'white' }}>
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: 'white' }}>
                          Data: {item.date}
                        </Typography>
                      }
                    />
                    <ArrowForwardIosIcon sx={{ color: 'white' }} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Grid>
        )}
  
        {/* Offer rendering */}
        {offerData.length > 1 && (
          <Grid xs={12} lg={6} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', margin: '8px', borderRadius: '5px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom color='white'>
                Zobacz ofertę
              </Typography>
  
              <Box
                component="img"
                sx={{
                  maxHeight: '300px',
                  maxWidth: '100%',
                  marginBottom: '20px',
                  borderRadius: '25px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                alt="Oferta"
                src={offerData[1].photoPath || '/default-image.jpg'}
              />
  
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: '25px' }}
                onClick={handleDownloadOffer}
              >
                Pobierz ofertę
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
export default Events;
