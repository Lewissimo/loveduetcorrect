import React, { useState, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YouTubeIcon from '@mui/icons-material/YouTube'; // Import ikony YouTube
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';
import { moviesType } from '@/context/firebaseDataContext';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    }}
  >
    <ArrowBackIosNewIcon />
  </IconButton>
);

const Movies: React.FC<{ moviesData: moviesType }> = ({ moviesData }) => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setSlidesToShow(3);
    } else if (width >= 960) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(1);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <Box minHeight={'100vh'} display={'flex'} flexDirection={'column'} bgcolor={'rgb(23, 19, 20)'} id='movies'>
      <Box sx={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
        <Slider {...settings}>
          {moviesData.paths.map((url, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                paddingTop: '56.25%',
                margin: '0 10px',
                overflow: 'hidden',
              }}
            >
              <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                controls={true}
              />
           
            </Box>
          ))}
        </Slider>
        <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop={'50px'}
              >
                <YouTubeIcon sx={{ color: 'red', marginRight: '8px' }} />
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => window.open('https://www.youtube.com/channel/YOUR_CHANNEL_ID', '_blank')}
                >
                  Zobacz nasz kanał
                </Typography>
              </Box>
      </Box>
    </Box>
  );
};

export default Movies;
