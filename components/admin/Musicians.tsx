// Musicians.tsx
import React, { useState, useEffect } from 'react';
import { Box, Stack, Container, Typography, Button, IconButton, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import PersonCard from '../PersonalCard';
import { artistsType } from '@/context/dataTypes';
import EditArtistForm from './EditArtistForm';
import { db, storage } from '@/firebase/firebase';
import { doc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import CircularProgress from '@mui/material/CircularProgress';

const Musicians: React.FC<{ artistsData: artistsType[] }> = ({ artistsData }) => {
  const [showMusicians, setShowMusicians] = useState(false);
  const [editArtist, setEditArtist] = useState<artistsType | null>(null);
  const [currentArtists, setCurrentArtists] = useState<artistsType[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<artistsType | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getImageURL = async (path: string): Promise<string> => {
    try {
      if (!path) return '';
      const imageRef = ref(storage, path);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error(`Błąd pobierania obrazu dla ścieżki: ${path}`, error);
      return '';
    }
  };
  
  useEffect(() => {
    setCurrentArtists(artistsData.sort((a, b) => a.order - b.order));
  }, [artistsData]);

  const toggleMusicians = () => setShowMusicians((prev) => !prev);

  const handleEdit = (artist: artistsType) => {
    setEditArtist(artist);
  };
const handleCloseDialog = async () => {
  setEditArtist(null);
  setIsAddFormOpen(false);

  try {
    const snapshot = await getDocs(collection(db, 'artists'));
  
    const updatedArtists = await Promise.all(
      snapshot.docs.map(async (doc) => ({
        id: doc.id,
        name: doc.data().name || '',
        intro: doc.data().intro || '',
        role: doc.data().role || '',
        photo: await getImageURL(doc.data().photo),
        description: doc.data().description || '',
        order: doc.data().order || 0,
      })) 
    );
  
    const sortedArtists = updatedArtists.sort((a, b) => a.order - b.order);
    
    console.log(sortedArtists);
    setCurrentArtists(sortedArtists);
  } catch (error) {
    console.error('Error fetching updated artists:', error);
  }
  
};


const handleDelete = async (artist: artistsType) => {
  if (!artist.id) {
    console.error('Error deleting artist: Artist ID is missing.');
    return;
  }

  setIsLoading(true);
  try {
    if (artist.photo) {
      const photoRef = ref(storage, artist.photo);
      await deleteObject(photoRef);
    }

    await deleteDoc(doc(db, 'artists', artist.id));

    setCurrentArtists((prevArtists) => {
      const updatedArtists = prevArtists.filter((a) => a.id !== artist.id);

      const reorderedArtists = updatedArtists.map((a, index) => ({
        ...a,
        order: index,
      }));

      reorderedArtists.forEach(async (a) => {
        const docRef = doc(db, 'artists', a.id);
        await updateDoc(docRef, { order: a.order });
      });

      return reorderedArtists;
    });

    setConfirmDelete(null);
  } catch (error) {
    console.error('Error deleting artist:', error);
  } finally {
    setIsLoading(false);
  }
};


const handleReorder = async (index: number, direction: 'up' | 'down') => {
  console.log(index);
  setIsLoading(true);

  try {
    const newArtists = [...currentArtists];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    [newArtists[index], newArtists[swapIndex]] = [newArtists[swapIndex], newArtists[index]];

    const updatedOrderArtists = newArtists.map((artist, idx) => ({
      ...artist,
      order: idx,
    }));

    setCurrentArtists(updatedOrderArtists);

    console.log(updatedOrderArtists[index].id);
    console.log(updatedOrderArtists[swapIndex].id);

    if (updatedOrderArtists[index].id && updatedOrderArtists[swapIndex].id) {
      const artistRef1 = doc(db, 'artists', updatedOrderArtists[index].id);
      const artistRef2 = doc(db, 'artists', updatedOrderArtists[swapIndex].id);

      console.log(artistRef1);
      console.log(artistRef2);

      await updateDoc(artistRef1, { order: updatedOrderArtists[index].order });
      await updateDoc(artistRef2, { order: updatedOrderArtists[swapIndex].order });
    }
  } catch (error) {
    console.error('Błąd podczas zamiany artystów:', error);
  } finally {
    setIsLoading(false);
  }
};

  
  return (
    <Box id='artist' sx={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#f4f4f4', justifyContent: 'center' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
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
        </Box>
      )}

      <Box sx={{ width: 'clamp(300px, 100%, 1200px)', transition: '1.3s', height: showMusicians ? '800px' : '300px', maxHeight: '100vh', padding: '2rem', overflowY: showMusicians ? 'auto' : 'hidden', color: 'black', borderRadius: '20px' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ marginBottom: '2rem', fontStyle: 'oblique' }}>
            Poznaj naszych muzyków
          </Typography>

          <Box display="flex" justifyContent="center" mb={4}>
            <Button variant="outlined" color="primary" onClick={toggleMusicians} fullWidth href='#artist' sx={{ fontSize: '1.4em', borderRadius: '25px' }}>
              {showMusicians ? 'Zwiń' : 'Rozwiń'}
            </Button>
          </Box>

          {showMusicians && (
            <Stack spacing={4}>
              {currentArtists.map((element, index) => (
                <Box key={index} display="flex" justifyContent="center" alignItems="center" sx={{ position: 'relative', "&:hover .editIcon": { display: 'flex' } }}>
                  <PersonCard intro={element.intro} photo={element.photo} name={element.name} role={element.role} description={element.description} />
                  <Box sx={{ position: 'absolute', top: '10px', right: '10px', display: 'none' }} className="editIcon">
                    <IconButton onClick={() => handleEdit(element)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setConfirmDelete(element)}>
                      <DeleteIcon />
                    </IconButton>
                    {index > 0 && (
                      <IconButton onClick={() => handleReorder(index, 'up')}>
                        <ArrowUpwardIcon />
                      </IconButton>
                    )}
                    {index < currentArtists.length - 1 && (
                      <IconButton onClick={() => handleReorder(index, 'down')}>
                        <ArrowDownwardIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          )}

          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddFormOpen(true)}>
              Dodaj Muzyka
            </Button>
          </Box>
        </Container>
      </Box>

      {editArtist && (
        <Dialog open={true} onClose={handleCloseDialog} fullWidth>
          <DialogContent>
            <EditArtistForm artist={editArtist} onClose={handleCloseDialog} max={currentArtists[currentArtists.length - 1].order}/>
          </DialogContent>
        </Dialog>
      )}

      {confirmDelete && (
        <Dialog open={true} onClose={() => setConfirmDelete(null)}>
          <DialogTitle>Czy na pewno chcesz usunąć muzyka {confirmDelete.name}?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>Nie</Button>
            <Button color="secondary" onClick={() => handleDelete(confirmDelete)}>Tak</Button>
          </DialogActions>
        </Dialog>
      )}
{isAddFormOpen && (
  <Dialog open={true} onClose={handleCloseDialog}>
    <DialogContent>
      <EditArtistForm artist={null} onClose={handleCloseDialog} max={currentArtists.length > 0 ? currentArtists[currentArtists.length - 1].order + 1 : 0}/>
    </DialogContent>
  </Dialog>
)}

    </Box>
  );
};

export default Musicians;
