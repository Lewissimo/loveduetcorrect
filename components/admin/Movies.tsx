import React, { useState, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import { Box, IconButton, Typography, Button, Dialog, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';
import { moviesType } from '@/context/dataTypes';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/firebase';

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
  const [videos, setVideos] = useState<string[]>(moviesData.paths);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (index: number) => {
    if (draggedIndex === null) return;
    
    const reorderedVideos = [...videos];
    const [removed] = reorderedVideos.splice(draggedIndex, 1);
    reorderedVideos.splice(index, 0, removed);

    setDraggedIndex(null);
    setVideos(reorderedVideos);
  };

  const handleRemoveVideo = (index: number) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  const handleSaveChanges = async () => {
    try {
      const docRef = doc(db, 'movies', 'movies');
      await updateDoc(docRef, { paths: videos });
      setEditMode(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleAddVideo = () => {
    if (newVideoUrl.trim()) {
      setVideos([...videos, newVideoUrl.trim()]);
      setNewVideoUrl('');
      setOpenAddDialog(false);
    }
  };

  return (
    <Box minHeight={'100vh'} display={'flex'} flexDirection={'column'} bgcolor={'rgb(23, 19, 20)'} id='movies'>
      <Box sx={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
        <IconButton onClick={() => setEditMode(!editMode)} sx={{ color: 'white', marginBottom: '10px' }}>
          <EditIcon />
        </IconButton>
        
        <Slider {...settings}>
          {videos.map((url, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                paddingTop: '56.25%',
                margin: '0 10px',
                overflow: 'hidden',
                cursor: editMode ? 'grab' : 'default',
                border: editMode ? '2px dashed #fff' : 'none',
              }}
              draggable={editMode}
              onDragStart={() => onDragStart(index)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(index)}
            >
              <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                controls={!editMode}
              />
              {editMode && (
                <>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 2,
                      cursor: 'grab',
                      backgroundColor: 'transparent',
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveVideo(index)}
                    sx={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      zIndex: 3,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          ))}
        </Slider>

        <Box display="flex" justifyContent="center" alignItems="center" marginTop={'50px'}>
          <YouTubeIcon sx={{ color: 'red', marginRight: '8px' }} />
          <Typography
            variant="subtitle1"
            sx={{ color: 'white', cursor: 'pointer' }}
            onClick={() => window.open('https://www.youtube.com/@pawelwytrazek2005/videos', '_blank')}
          >
            Zobacz nasz kanał
          </Typography>
        </Box>

        {editMode && (
          <Box display="flex" justifyContent="center" alignItems="center" marginTop={'20px'}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Dodaj film
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: '10px' }}
              onClick={handleSaveChanges}
            >
              Zapisz zmiany
            </Button>
          </Box>
        )}

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <Box padding={3} display="flex" flexDirection="column" alignItems="center">
            <IconButton onClick={() => setOpenAddDialog(false)} style={{ position: 'absolute', right: 8, top: 8, color: 'black' }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Dodaj nowy filmik
            </Typography>
            <TextField
              label="YouTube URL"
              variant="outlined"
              value={newVideoUrl}
              onChange={(e) => setNewVideoUrl(e.target.value)}
              fullWidth
              sx={{ marginBottom: '20px' }}
            />
            <Button variant="contained" onClick={handleAddVideo}>
              Dodaj
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Movies;
