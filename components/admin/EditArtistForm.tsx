// EditArtistForm.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Stepper, Step, StepLabel } from '@mui/material';
import { artistsType } from '@/context/dataTypes';
import { updateDoc, addDoc, doc, collection } from 'firebase/firestore';
import { db, storage } from '@/firebase/firebase';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import CircularProgress from '@mui/material/CircularProgress';

interface EditArtistFormProps {
  artist: artistsType | null;
  onClose: () => void;
  max:number;
}

const EditArtistForm: React.FC<EditArtistFormProps> = ({ artist, onClose, max }) => {
  const [formData, setFormData] = useState<artistsType>({
    id: artist?.id || '',
    name: artist?.name || '',
    intro: artist?.intro || '',
    role: artist?.role || '',
    photo: artist?.photo || '',
    description: artist?.description || '',
    order: artist?.order || 0,
  });

  const [step, setStep] = useState(0);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (newPhoto) {
        if (artist?.photo) {
          const oldPhotoRef = ref(storage, artist.photo);
          await deleteObject(oldPhotoRef);
        }

        const newPhotoRef = ref(storage, `artists/${newPhoto.name}`);
        await uploadBytes(newPhotoRef, newPhoto);
        const newPhotoURL = await getDownloadURL(newPhotoRef);
        formData.photo = newPhotoURL;
      }

      if (artist) {
        const artistRef = doc(db, 'artists', artist.id);
        await updateDoc(artistRef, formData);
      } else {
        const artistsCollection = collection(db, 'artists');
        console.log(max);
        formData.order = max;
        await addDoc(artistsCollection, formData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving artist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '1rem' }}>
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      
      <Stepper activeStep={step} alternativeLabel>
        {['Name & Photo', 'Intro', 'Description'].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {step === 0 && (
        <Box mt={2}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleInputChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Role" name="role" value={formData.role} onChange={handleInputChange} sx={{ mb: 2 }} />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </Box>
      )}

      {step === 1 && (
        <Box mt={2}>
          <TextField fullWidth multiline rows={15} label="Intro" name="intro" value={formData.intro} onChange={handleInputChange} />
        </Box>
      )}

      {step === 2 && (
        <Box mt={2}>
          <TextField fullWidth multiline rows={15} label="Description" name="description" value={formData.description} onChange={handleInputChange} />
        </Box>
      )}

      <Box mt={4} display="flex" justifyContent="space-between">
        {step > 0 && <Button onClick={handleBack}>Wróć</Button>}
        {step < 2 ? (
          <Button onClick={handleNext}>Dalej</Button>
        ) : (
          <Button variant="contained" onClick={handleSave}>Zapisz</Button>
        )}
      </Box>
    </Box>
  );
};

export default EditArtistForm;
