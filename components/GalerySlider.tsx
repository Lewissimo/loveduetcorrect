import React, { useState } from 'react';
import Slider from 'react-slick';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Box } from '@mui/material';

interface GallerySliderProps {
  data: string[];
  backFunction: (element: null | number) => void;
}

const GallerySlider: React.FC<GallerySliderProps> = ({
  data,
  backFunction,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  interface ArrowProps {
    onClick?: () => void;
  }

  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
      <IconButton
        onClick={onClick}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: 'black',
        }}
        aria-label="Następny slajd"
      >
        <ArrowForwardIosIcon sx={{ color: 'white' }} />
      </IconButton>
    );
  };

  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
      <IconButton
        onClick={onClick}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: 'white',
        }}
        aria-label="Poprzedni slajd"
      >
        <ArrowBackIosNewIcon sx={{ color: 'white' }} />
      </IconButton>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleNext = () => setCurrentImage((currentImage + 1) % data.length);
  const handlePrev = () =>
    setCurrentImage((currentImage + data.length - 1) % data.length);
  const handleClose = () => setOpen(false);
  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setOpen(true);
  };

  return (
    <Box component="section">
      <IconButton
        onClick={() => backFunction(null)}
        href='#gallery'
        style={{
          position: 'absolute',
          left: 16,
          top: 16,
          zIndex: 10,
          color: 'white',
        }}
        aria-label="Powrót do galerii"
      >
        <ArrowBackIosNewIcon sx={{ color: 'white' }} />
      </IconButton>

      <Slider {...settings}>
        {data.map((img, index) => (
          <Box
            height="100vh"
            padding="30px"
            overflow="visible"
            key={index}
            onClick={() => handleImageClick(index)}
            display="flex !important"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={img}
              alt={`Slide ${index}`}
              width={100}
              height={200}
              layout="responsive"
              style={{ maxWidth: '500px' }}
            />
          </Box>
        ))}
      </Slider>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <IconButton
          onClick={handleClose}
          style={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
          aria-label="Zamknij podgląd"
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
          }}
          aria-label="Poprzednie zdjęcie"
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
          }}
          aria-label="Następne zdjęcie"
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <div
          style={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Image
              src={data[currentImage]}
              alt={`Gallery image ${currentImage}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </Dialog>
    </Box>
  );
};

export default GallerySlider;
