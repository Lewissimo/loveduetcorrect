import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  TextField,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { contactType } from '@/context/dataTypes';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase/firebase';
import AddIcon from '@mui/icons-material/Add';

const Contact: React.FC<{ contactData: contactType[] }> = ({ contactData }) => {
  const [contacts, setContacts] = useState<contactType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newContact, setNewContact] = useState<contactType>({
    order: 0,
    id: '',
    name: '',
    phone: '',
    mail: '',
    fbPath: '',
    photo: '',
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log(contactData[1].order);
    setContacts(contactData.sort((a, b) => a.order - b.order));
  }, [contactData]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewContact(contacts[index]);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (newPhoto) {
        const photoRef = ref(storage, `contactPhotos/${newPhoto.name}-${Date.now()}`);
        await uploadBytes(photoRef, newPhoto);
        const photoUrl = await getDownloadURL(photoRef);
        newContact.photo = photoUrl;
      }

      const updatedContacts = [...contacts];
      updatedContacts[editIndex!] = newContact;
      setContacts(updatedContacts);

      const docRef = doc(db, 'contactData', newContact.id);
      await updateDoc(docRef, {
        name: newContact.name,
        phone: newContact.phone,
        mail: newContact.mail,
        fbPath: newContact.fbPath,
        photo: newContact.photo,
        order: newContact.order,
      });

      setOpenDialog(false);
      setNewPhoto(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleAddNewContact = async () => {
    try {
      if (newPhoto) {
        const photoRef = ref(storage, `contactPhotos/${newPhoto.name}-${Date.now()}`);
        await uploadBytes(photoRef, newPhoto);
        const photoUrl = await getDownloadURL(photoRef);
        newContact.photo = photoUrl;
      }

      const newOrder = contacts.length;
      const docRef = doc(collection(db, 'contactData'));
      await setDoc(docRef, {
        name: newContact.name,
        phone: newContact.phone,
        mail: newContact.mail,
        fbPath: newContact.fbPath,
        photo: newContact.photo,
        order: newOrder,
      });

      newContact.id = docRef.id;
      newContact.order = newOrder;
      setContacts([...contacts, newContact].sort((a, b) => a.order - b.order));

      setOpenAddDialog(false);
      setNewContact({
        order: 0,
        id: '',
        name: '',
        phone: '',
        mail: '',
        fbPath: '',
        photo: '',
      });
      setNewPhoto(null);
    } catch (error) {
      console.error('Error adding new contact:', error);
    }
  };

  const handleRemove = async (index: number) => {
    try {
      const contactToRemove = contacts[index];
  
      const updatedContacts = contacts.filter((_, i) => i !== index);
      
      const reorderedContacts = updatedContacts.map((contact, i) => ({
        ...contact,
        order: i,
      }));
  
      setContacts(reorderedContacts);
  
      const docRef = doc(db, 'contactData', contactToRemove.id);
      await deleteDoc(docRef);
  
      const imageRef = ref(storage, contactToRemove.photo);
      await deleteObject(imageRef);
  
      for (const contact of reorderedContacts) {
        const updateDocRef = doc(db, 'contactData', contact.id);
        await updateDoc(updateDocRef, { order: contact.order });
      }
  
    } catch (error) {
      console.error('Error removing contact:', error);
    }
  };
  

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = async (index: number) => {
    if (draggedIndex === null) return;

    const reorderedContacts = [...contacts];
    const [draggedItem] = reorderedContacts.splice(draggedIndex, 1);
    reorderedContacts.splice(index, 0, draggedItem);

    const updatedOrderContacts = reorderedContacts.map((contact, i) => ({
      ...contact,
      order: i,
    }));

    setContacts(updatedOrderContacts);
    setDraggedIndex(null);

    try {
      for (const contact of updatedOrderContacts) {
        const docRef = doc(db, 'contactData', contact.id);
        await updateDoc(docRef, { order: contact.order });
      }
    } catch (error) {
      console.error('Error updating contact order:', error);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: '20px',
      }}
    >
      <Grid container spacing={4} maxWidth="lg">
        {contacts.map((element, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={element.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: '15px',
                padding: '20px',
                backgroundColor: '#ffffff',
                cursor: 'grab',
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center" marginBottom="20px">
                  <Box
                    component="img"
                    src={element.photo}
                    alt="photo error"
                    sx={{
                      width: 150,
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginBottom: '20px',
                    }}
                  />
                  <Typography variant="h5" component="div" gutterBottom>
                    {element.name}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" marginBottom="10px">
                  <EmailIcon sx={{ marginRight: '10px', color: '#1976d2' }} />
                  <Typography variant="body1">
                    <a href={`mailto:${element.mail}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {element.mail}
                    </a>
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" marginBottom="10px">
                  <PhoneIcon sx={{ marginRight: '10px', color: '#1976d2' }} />
                  <Typography variant="body1">{element.phone}</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <FacebookIcon sx={{ marginRight: '10px', color: '#3b5998' }} />
                  <Typography variant="body1">
                    <a
                      href={element.fbPath}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              setNewContact({
                order: contacts.length,
                id: '',
                name: '',
                phone: '',
                mail: '',
                fbPath: '',
                photo: '',
              });
              setOpenAddDialog(true);
            }}
          >
            Dodaj Dane Kontaktowe
          </Button>
        </Grid>
      </Grid>

      {/* Edit Contact Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box padding={3} display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => setOpenDialog(false)} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Edytuj Kontakt</Typography>
          <TextField
            label="Imię"
            variant="outlined"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label="Telefon"
            variant="outlined"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            value={newContact.mail}
            onChange={(e) => setNewContact({ ...newContact, mail: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label="Facebook Path"
            variant="outlined"
            value={newContact.fbPath}
            onChange={(e) => setNewContact({ ...newContact, fbPath: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <Button variant="contained" component="label" startIcon={<AddIcon />}>
            Zmień Zdjęcie
            <input
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setNewPhoto(e.target.files[0]);
                }
              }}
            />
          </Button>
          <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSave}>
            Zapisz Zmiany
          </Button>
        </Box>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <Box padding={3} display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => setOpenAddDialog(false)} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Dodaj Nowy Kontakt</Typography>
          <TextField
            label="Imię"
            variant="outlined"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label="Telefon"
            variant="outlined"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            value={newContact.mail}
            onChange={(e) => setNewContact({ ...newContact, mail: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label="Facebook Path"
            variant="outlined"
            value={newContact.fbPath}
            onChange={(e) => setNewContact({ ...newContact, fbPath: e.target.value })}
            sx={{ marginBottom: '10px' }}
            fullWidth
          />
          <Button variant="contained" component="label" startIcon={<AddIcon />}>
            Dodaj Zdjęcie
            <input
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setNewPhoto(e.target.files[0]);
                }
              }}
            />
          </Button>
          <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleAddNewContact}>
            Dodaj
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Contact;
