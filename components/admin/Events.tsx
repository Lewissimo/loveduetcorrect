import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, updateDoc, deleteDoc, addDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/firebase/firebase';
import { eventsType, offerType } from '@/context/dataTypes';

const Events: React.FC<{ eventsData: eventsType[]; offerData: offerType[] }> = ({ eventsData, offerData }) => {
  const [events, setEvents] = useState<eventsType[]>([]);
  const [offer, setOffer] = useState(offerData[0] || { pathPDF: '', photoPath: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [openOfferDialog, setOpenOfferDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<eventsType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [newOfferImage, setNewOfferImage] = useState<File | null>(null);
  const [newOfferPDF, setNewOfferPDF] = useState<File | null>(null);

  useEffect(()=>{
    setEvents(eventsData.sort((a, b) => a.order - b.order));
  }, [eventsData])
  const handleEdit = (event: eventsType | null = null) => {
    setCurrentEvent(event || { id: '', name: '', date: '', place: '', path: '', order: events.length });
    setIsEditing(!!event);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setCurrentEvent(null);
    setOpenDialog(false);
  };

  const handleChange = (field: keyof eventsType, value: string) => {
    setCurrentEvent({ ...currentEvent, [field]: value } as eventsType);
  };

  const handleSaveEvent = async () => {
    try {
      if (currentEvent) {
        if (isEditing) {
          const eventRef = doc(db, 'Events_m', currentEvent.id);
          await updateDoc(eventRef, {
            name: currentEvent.name,
            date: currentEvent.date,
            place: currentEvent.place,
            path: currentEvent.path,
            order: currentEvent.order,
          });
        } else {
          const newOrder = events.length;
          await addDoc(collection(db, 'Events_m'), {
            name: currentEvent.name,
            date: currentEvent.date,
            place: currentEvent.place,
            path: currentEvent.path,
            order: newOrder,
          });
        }
        await refreshEvents();
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error saving event: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'Events_m', id));
        await refreshEvents();
      } catch (error) {
        console.error('Error deleting event: ', error);
      }
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const reorderedEvents = [...events];
      const draggedItem = reorderedEvents[draggedIndex];
      reorderedEvents.splice(draggedIndex, 1);
      reorderedEvents.splice(index, 0, draggedItem);
      setDraggedIndex(index);
      setEvents(reorderedEvents);
    }
  };

  const handleDragEnd = async () => {
    try {
      await updateAllEvents();
      setDraggedIndex(null);
    } catch (error) {
      console.error('Error updating event order:', error);
    }
  };

  const updateAllEvents = async () => {
    try {
      for (let index = 0; index < events.length; index++) {
        const event = events[index];
        const eventRef = doc(db, 'Events_m', event.id);
        await updateDoc(eventRef, {
          order: index,
        });
      }
      await refreshEvents();
    } catch (error) {
      console.error('Error updating all events:', error);
    }
  };

  const refreshEvents = async () => {
    try {
      const eventsQuery = query(collection(db, 'Events_m'), orderBy('order'));
      const eventsSnapshot = await getDocs(eventsQuery);
      const updatedEvents = eventsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as eventsType[];
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error refreshing events:', error);
    }
  };

  const handleEditOffer = () => {
    setOpenOfferDialog(true);
  };

  const handleOfferClose = () => {
    setOpenOfferDialog(false);
  };

  const handleOfferImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewOfferImage(e.target.files[0]);
    }
  };

  const handleOfferPDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewOfferPDF(e.target.files[0]);
    }
  };

  const handleSaveOffer = async () => {
    try {
      let photoPath = offer.photoPath;
      let pdfPath = offer.pathPDF;

      if (newOfferImage) {
        if (offer.photoPath) {
          const oldImageRef = ref(storage, offer.photoPath);
          await deleteObject(oldImageRef);
        }
        const imageStorageRef = ref(storage, `offer/${newOfferImage.name}`);
        await uploadBytes(imageStorageRef, newOfferImage);
        photoPath = await getDownloadURL(imageStorageRef);
      }

      if (newOfferPDF) {
        if (offer.pathPDF) {
          const oldPDFRef = ref(storage, offer.pathPDF);
          await deleteObject(oldPDFRef);
        }
        const pdfStorageRef = ref(storage, `offer/${newOfferPDF.name}`);
        await uploadBytes(pdfStorageRef, newOfferPDF);
        pdfPath = await getDownloadURL(pdfStorageRef);
      }

      const offerRef = doc(db, 'offer', 'offer');
      await updateDoc(offerRef, {
        photo: photoPath,
        path: pdfPath,
      });

      setOffer({ id: offer.id, photoPath, pathPDF: pdfPath });
      handleOfferClose();
    } catch (error) {
      console.error("Error updating offer: ", error);
    }
  };

  const handleDownloadOffer = () => {
    if (offer.pathPDF) {
      const link = document.createElement('a');
      link.href = offer.pathPDF;
      link.download = 'Offer.pdf';
      link.click();
    } else {
      console.warn('Path to PDF is missing.');
    }
  };

  return (
    <Box id="offer">
      <Grid container sx={{ my: '50px' }}>
        <Grid item xs={12} lg={6} display="flex" flexDirection="column" alignItems="center">
          <Box sx={{ bgcolor: 'rgba(23, 19, 20, .7)', margin: '8px', borderRadius: '25px', padding: '20px' }}>
            <Typography variant="h4" gutterBottom color="white">
              Zobacz najbliższe wydarzenia:
            </Typography>
            <List>
              {events.map((item, index) => (
                <ListItemButton
                  key={index}
                  sx={{ cursor: 'grab', color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                >
                  <ListItemText
                    primary={<Typography sx={{ color: 'white' }}>{item.name}</Typography>}
                    secondary={
                      <>
                        <Typography sx={{ color: 'white' }}>Data: {item.date}</Typography>
                        <Typography sx={{ color: 'white' }}>Lokalizacja: {item.place}</Typography>
                      </>
                    }
                  />
                  <IconButton onClick={() => handleEdit(item)}>
                    <EditIcon sx={{ color: 'white' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
            <Button variant="contained" onClick={() => handleEdit()} sx={{ mt: 2 }}>
              Dodaj Nowe Wydarzenie
            </Button>
          </Box>
        </Grid>

        {offer && (
          <Grid item xs={12} lg={6} display="flex" alignItems="center" justifyContent="center">
            <Box sx={{ textAlign: 'center', margin: '8px', borderRadius: '5px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom color="white">
                Zobacz ofertę
              </Typography>
              <Box
                component="img"
                sx={{
                  maxHeight: '300px',
                  maxWidth: '100%',
                  marginBottom: '20px',
                  borderRadius: '25px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                alt="Oferta"
                src={offer.photoPath || '/default-image.jpg'}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: '25px', mb: 2 }}
                onClick={handleDownloadOffer}
              >
                Pobierz ofertę
              </Button>
              <Button variant="contained" color="secondary" onClick={handleEditOffer}>
                Aktualizuj Ofertę
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edytuj Wydarzenie' : 'Dodaj Nowe Wydarzenie'}</DialogTitle>
        <DialogContent>
          <TextField label="Tytuł" fullWidth margin="dense" value={currentEvent?.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
          <TextField label="Data" fullWidth margin="dense" value={currentEvent?.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
          <TextField label="Lokalizacja" fullWidth margin="dense" value={currentEvent?.place || ''} onChange={(e) => handleChange('place', e.target.value)} />
          <TextField label="Path" fullWidth margin="dense" value={currentEvent?.path || ''} onChange={(e) => handleChange('path', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleSaveEvent}>{isEditing ? 'Zapisz' : 'Dodaj'}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openOfferDialog} onClose={handleOfferClose}>
        <DialogTitle>Aktualizuj Ofertę</DialogTitle>
        <DialogContent>
          <input type="file" accept="application/pdf" onChange={handleOfferPDFChange} style={{ marginTop: '16px' }} />
          <input type="file" accept="image/*" onChange={handleOfferImageChange} style={{ marginTop: '16px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOfferClose}>Anuluj</Button>
          <Button onClick={handleSaveOffer}>Zapisz</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Events;
