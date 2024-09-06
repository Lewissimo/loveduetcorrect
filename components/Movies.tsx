import React from 'react';
import Slider, { Settings } from 'react-slick';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

const videoUrls = [
  'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  'https://www.youtube.com/watch?v=ScMzIvxBSi4',
];

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

const Movies: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box height={'100vh'} display={'flex'} flexDirection={'column'} bgcolor={'rgb(23, 19, 20)'} id='movies'>
      <Box sx={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
        <Slider {...settings}>
          {videoUrls.map((url, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                paddingTop: '56.25%',
                margin: '0 10px',
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
      </Box>
    </Box>
  );
};

export default Movies;
