import React, { useState } from 'react';
import { Box, IconButton, CircularProgress, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { intro } from '@/context/dataTypes';
import { db, storage } from '@/firebase/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const PhotoComponent: React.FC<{ introData: intro[] }> = ({ introData }) => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(introData.length > 0 ? introData[0].portrait : '');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `intro/portrait.png`);

      try {
        setIsLoading(true);

        await deleteObject(storageRef);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        const introDocRef = doc(db, 'Intro', 'introPhotos');
        await updateDoc(introDocRef, {
          portrait: downloadURL,
        });

        setBackgroundImageUrl(`${downloadURL}?t=${new Date().getTime()}`);
      } catch (error) {
        console.error('Błąd podczas aktualizacji zdjęcia portretowego:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box
      sx={{
        height: { sm: '70vh', xs: '300px' },
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundPositionY: 'top',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        backgroundColor: 'rgb(23, 19, 20)',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            width: '100%',
            height: '100%',
            zIndex: 2,
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="body2" color="white" sx={{ mt: 2 }}>
            Trwa przesyłanie zdjęcia...
          </Typography>
        </Box>
      ) : null}

      <IconButton
        sx={{
          color: 'white',
          fontSize: '128px',
          backgroundColor: 'black',
          transition: '.4s',
          '&:hover': {
            outline: '2px solid white',
            backgroundColor: 'black',
          },
          padding: '8px',
          borderRadius: '50%',
          position: 'absolute',
          bottom: '16px',
          zIndex: 1,
        }}
        onClick={triggerFileInput}
      >
        <EditIcon sx={{ fontSize: '128px' }} />
      </IconButton>

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </Box>
  );
};

export default PhotoComponent;
