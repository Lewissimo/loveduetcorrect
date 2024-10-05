import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Slider from 'react-slick';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CircularProgress from '@mui/material/CircularProgress';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from '@/firebase/firebase';
import { galeryType } from '@/context/dataTypes';

const GallerySlider = ({ data, backFunction, documentId, name, setFun }: { data: string[], backFunction: (element: null | number) => void, documentId: string, name: string, setFun: Dispatch<SetStateAction<galeryType[]>>; }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>(data);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [updatedImages, setUpdatedImages] = useState<File[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setImages(data);
  }, [data]);

  const handleSaveChanges = async () => {
    try {
        setIsLoading(true);
        console.log("Rozpoczęcie procesu zapisywania...");

        const removedImages = data.filter(img => !images.includes(img));

        for (const img of removedImages) {
            try {
                const imageRef = ref(storage, img);
                await deleteObject(imageRef);
                console.log(`Usunięto obraz ze storage: ${img}`);
            } catch (error) {
                console.error(`Nie udało się usunąć obrazu ${img} ze storage`, error);
            }
        }

        const uploadedUrls: string[] = [];

        for (const file of updatedImages) {
            console.log(`Przesyłanie pliku: ${file.name}`);
            const fileRef = ref(storage, `gallery/${name}/${file.name}-${Date.now()}`);

            try {
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                console.log(`Plik przesłany pomyślnie: ${url}`);
                uploadedUrls.push(url);
            } catch (uploadError) {
                console.error(`Błąd podczas przesyłania pliku ${file.name}:`, uploadError);
            }
        }

const finalPaths = images
  .map(img => (img.startsWith("blob:") ? uploadedUrls.shift() : img))
  .filter((path): path is string => path !== undefined && path !== "");

const docRef = doc(db, 'photoSections', documentId);
await updateDoc(docRef, { paths: finalPaths });

console.log("Firestore zaktualizowane pomyślnie z nowymi ścieżkami");
setFun(prev => prev.map(item => item.id === documentId ? { ...item, paths: finalPaths } : item));

        setImages(finalPaths);
        setPreviewImages([]);
        setUpdatedImages([]);
        setEditMode(false);
        console.log("Proces zapisu zakończony pomyślnie.");
    } catch (error) {
        console.error('Błąd podczas zapisywania zmian:', error);
    } finally {
        setIsLoading(false);
    }
};


  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (index: number) => {
    if (draggedIndex === null) return;

    const reorderedImages = [...images];
    const [removed] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(index, 0, removed);

    setDraggedIndex(null);
    setImages(reorderedImages);
  };

  const handleImageRemove = async (index: number) => {
    const imageToRemove = images[index];

    try {
      const imageRef = ref(storage, imageToRemove);
      await deleteObject(imageRef);
      console.log(`Image ${imageToRemove} deleted successfully from storage`);
      
      setImages(images.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing image from storage:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const fileList = Array.from(event.target.files);
        setUpdatedImages((prev) => [...prev, ...fileList]);

        const previewUrls = fileList.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...previewUrls]);
    }
};


  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'black' }}
    >
      <ArrowForwardIosIcon sx={{ color: 'white' }} />
    </IconButton>
  );

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'white' }}
    >
      <ArrowBackIosNewIcon sx={{ color: 'white' }} />
    </IconButton>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
            top: 0,
            left: 0,
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="body2" color="white" sx={{ mt: 2, ml: 2 }}>
            Trwa zapisywanie...
          </Typography>
        </Box>
      )}

      <Box display="flex" alignItems="center">
        <IconButton onClick={() => backFunction(null)} style={{ color: 'white' }}>
          <ArrowBackIosNewIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton onClick={() => setEditMode(true)} style={{ color: 'white' }}>
          <EditIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box height={'100vh'} padding={'30px'} overflow={'visible'}  key={index} display={'flex !important'} justifyContent={'center'} alignItems={'center'}>
          <Image src={img} alt={`Slide ${index}`} width={100} height={200} layout='responsive' style={{maxWidth: '500px'}} />
        </Box>
        ))}
      </Slider>
      <Dialog open={editMode} onClose={() => setEditMode(false)} maxWidth="lg" fullWidth>
        <Box padding={3} display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => setEditMode(false)} style={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
            <CloseIcon />
          </IconButton>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {[...images, ...previewImages].map((img, index) => ( 
              <Box
                key={index}
                position="relative"
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={onDragOver}
                onDrop={() => onDrop(index)}
                style={{ cursor: 'grab', padding: 5, border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <Image src={img} alt={`image-${index}`} width={150} height={100} />
                <IconButton onClick={() => handleImageRemove(index)} style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button variant="contained" component="label" startIcon={<AddPhotoAlternateIcon />}>
            Dodaj obrazy
            <input type="file" hidden multiple onChange={handleImageUpload} />
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveChanges} style={{ marginTop: 16 }}>
            Zapisz
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default GallerySlider;
