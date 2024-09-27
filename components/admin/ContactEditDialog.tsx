import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { contactType } from '@/context/dataTypes';

interface ContactEditDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  newContact: contactType;
  setNewContact: React.Dispatch<React.SetStateAction<contactType>>;
  handleSave: (photoFile: File | null) => void;
}

const ContactEditDialog: React.FC<ContactEditDialogProps> = ({ openDialog, setOpenDialog, newContact, setNewContact, handleSave }) => {
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(newContact.photo); // Set initial preview from the existing contact photo

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setNewPhoto(selectedFile);

      const previewURL = URL.createObjectURL(selectedFile);
      setPhotoPreview(previewURL);
    }
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <Box padding={3} display="flex" flexDirection="column" alignItems="center">
        <IconButton onClick={() => setOpenDialog(false)} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Edytuj kontakt</Typography>
        
        <Box
          component="img"
          src={photoPreview || newContact.photo}
          alt="Contact Preview"
          sx={{
            width: 150,
            height: 150,
            objectFit: 'cover',
            borderRadius: '50%',
            marginBottom: '20px',
          }}
        />

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
          label="Facebook"
          variant="outlined"
          value={newContact.fbPath}
          onChange={(e) => setNewContact({ ...newContact, fbPath: e.target.value })}
          sx={{ marginBottom: '10px' }}
          fullWidth
        />
        <Button variant="contained" component="label" startIcon={<AddPhotoAlternateIcon />}>
          Zmień zdjęcie
          <input 
            type="file" 
            hidden 
            onChange={handleFileChange} 
          />
        </Button>
        <Button variant="contained" sx={{ marginTop: '20px' }} onClick={() => handleSave(newPhoto)}>
          Zapisz
        </Button>
      </Box>
    </Dialog>
  );
};

export default ContactEditDialog;
