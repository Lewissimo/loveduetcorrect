import React, { useState, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import { Box, IconButton, Link } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YouTubeIcon from '@mui/icons-material/YouTube';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';
import { moviesType } from '@/context/dataTypes';

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
    aria-label="Następny slajd"
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
    aria-label="Poprzedni slajd"
  >
    <ArrowBackIosNewIcon />
  </IconButton>
);

const Movies: React.FC<{ moviesData: moviesType }> = ({ moviesData }) => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [playerVars, setPlayerVars] = useState({});

  useEffect(() => {
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

    handleResize(); // Set initial slidesToShow

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPlayerVars({ origin: window.location.origin });
    }
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
    accessibility: true,
  };

  return (
    <Box
      component="section"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bgcolor="rgb(23, 19, 20)"
      id="movies"
    >
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
                config={{
                  playerVars: playerVars,
                }}
              />
            </Box>
          ))}
        </Slider>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="50px"
        >
          <YouTubeIcon sx={{ color: 'red', marginRight: '8px' }} />
          <Link
            href="https://www.youtube.com/@pawelwytrazek2005/videos"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white', cursor: 'pointer', textDecoration: 'none' }}
            aria-label="Przejdź do naszego kanału YouTube"
          >
            Zobacz nasz kanał
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Movies;
