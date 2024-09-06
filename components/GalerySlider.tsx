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

const images = [
  '/slide1.jpg',  // Ensure these are accessible URLs
  '/slide2.jpg',
  '/slide3.jpg',
];

const GallerySlider: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  interface ArrowProps {
    onClick?: () => void;
  }

  const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
      <IconButton
        onClick={onClick}
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'black' }}
      >
        <ArrowForwardIosIcon sx={{color:'white'}}/>
      </IconButton>
    );
  };

  const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
      <IconButton
        onClick={onClick}
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'black' }}
      >
        <ArrowBackIosNewIcon sx={{color:'white'}}/>
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

  const handleNext = () => setCurrentImage((currentImage + 1) % images.length);
  const handlePrev = () => setCurrentImage((currentImage + images.length - 1) % images.length);
  const handleClose = () => setOpen(false);
  const handleImageClick = (index: number) => {
    console.log(`Image ${index} clicked.`);
    setCurrentImage(index);
    setOpen(true);
  };

  return (
    <Box>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box height={'700px'} padding={'30px'} display={'flex !important'} justifyContent={'center'} alignItems={'center'}  key={index} onClick={() => handleImageClick(index)} >
            <Image src={img} alt={`Slide ${index}`} width={300} height={200} layout='responsive' />
          </Box>
        ))}
      </Slider>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <IconButton onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={handlePrev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'white' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={handleNext} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'white' }}>
          <ArrowForwardIosIcon />
        </IconButton>
        <div style={{ width: '100%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Image src={images[currentImage]} alt={`Gallery image ${currentImage}`} layout='fill' objectFit='contain' />
          </div>
        </div>
      </Dialog>
    </Box>
  );
};

export default GallerySlider;
