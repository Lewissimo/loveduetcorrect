import React, { useState } from 'react';
import { Box, IconButton, CircularProgress, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NavBar from '../Navbar';
import { intro } from '@/context/dataTypes';
import { db, storage } from '@/firebase/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const MainPage: React.FC<{ introData: intro[] }> = ({ introData }) => {
    const [backgroundImage, setBackgroundImage] = useState(introData[0].logo);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const storageRef = ref(storage, `intro/logo.png`);

            try {
                setIsLoading(true);

                await deleteObject(storageRef);

                await uploadBytes(storageRef, file);

                const downloadURL = await getDownloadURL(storageRef);

                const introDocRef = doc(db, 'Intro', 'introPhotos');
                await updateDoc(introDocRef, {
                    logo: downloadURL,
                });

                setBackgroundImage(`${downloadURL}?t=${new Date().getTime()}`);
            } catch (error) {
                console.error('Błąd podczas aktualizacji logo:', error);
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
        <Box>
            <NavBar />
            <Box
                sx={{
                    backgroundColor: 'rgb(23, 19, 20)',
                    width: '100%',
                    height: '100vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
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
                            Trwa przesyłanie logo...
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
                        padding: '16px',
                        borderRadius: '50%',
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
        </Box>
    );
};

export default MainPage;
