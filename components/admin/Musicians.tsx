import React, { useState } from 'react';
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
import { deleteObject, ref } from 'firebase/storage';
import CircularProgress from '@mui/material/CircularProgress';

const Musicians: React.FC<{ artistsData: artistsType[] }> = ({ artistsData }) => {
  const [showMusicians, setShowMusicians] = useState(false);
  const [editArtist, setEditArtist] = useState<artistsType | null>(null);
  const [currentArtists, setCurrentArtists] = useState(artistsData);
  const [confirmDelete, setConfirmDelete] = useState<artistsType | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleMusicians = () => {
    setShowMusicians(prevShow => !prevShow);
  };

  const handleEdit = (artist: artistsType) => {
    setEditArtist(artist);
  };

  const handleCloseDialog = async () => {
    setEditArtist(null);
    setIsAddFormOpen(false);

    const snapshot = await getDocs(collection(db, 'artists'));
    const updatedArtists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as artistsType));
    setCurrentArtists(updatedArtists);
  };

  const handleDelete = async (artist: artistsType) => {
    setIsLoading(true);
    try {
      if (artist.photo) {
        const photoRef = ref(storage, artist.photo);
        await deleteObject(photoRef);
      }

      await deleteDoc(doc(db, 'artists', artist.id));
      setCurrentArtists(prevArtists => prevArtists.filter(a => a.id !== artist.id));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting artist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    setIsLoading(true);
    const newArtists = [...currentArtists];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    [newArtists[index], newArtists[swapIndex]] = [newArtists[swapIndex], newArtists[index]];

    setCurrentArtists(newArtists);

    try {
      const artistToSwap1 = newArtists[index];
      const artistToSwap2 = newArtists[swapIndex];

      const artistDocRef1 = doc(db, 'artists', artistToSwap1.id);
      const artistDocRef2 = doc(db, 'artists', artistToSwap2.id);

      const artistData1 = { ...artistToSwap1 };
      const artistData2 = { ...artistToSwap2 };

      await updateDoc(artistDocRef1, artistData2);
      await updateDoc(artistDocRef2, artistData1);

      console.log(`Swapped artist data between ${artistToSwap1.name} and ${artistToSwap2.name}`);
    } catch (error) {
      console.error('Error swapping artists:', error);
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
            <EditArtistForm artist={editArtist} onClose={handleCloseDialog} />
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
            <EditArtistForm artist={null} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Musicians;
