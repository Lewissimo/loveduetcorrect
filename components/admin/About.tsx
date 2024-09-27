import React, { ReactNode, useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton, Modal, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import AboutDetails from '../AboutDetails';
import Link from 'next/link';
import { aboutType } from '@/context/dataTypes';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const About: React.FC<{ aboutData: aboutType[] }> = ({ aboutData }) => {
  const [details, setDetails] = useState<ReactNode | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditData, setCurrentEditData] = useState<aboutType | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedIntroText, setEditedIntroText] = useState('');
  const [editedDetails, setEditedDetails] = useState<string[]>([]);
  const [aboutDocuments, setAboutDocuments] = useState<aboutType[]>(aboutData);

  const fetchAboutData = async () => {
    try {
      const aboutSnapshot = await getDocs(collection(db, 'about'));
      const fetchedData = aboutSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().title || '',
        introText: doc.data().introText || '',
        details: doc.data().details || [],
      }));
      setAboutDocuments(fetchedData);
    } catch (error) {
      console.error("Error fetching About data:", error);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleCheckDetails = (value: ReactNode | null) => {
    setDetails(value);
  };

  const handleEditClick = (data: aboutType) => {
    setCurrentEditData(data);
    setEditedTitle(data.name);
    setEditedIntroText(data.introText);
    setEditedDetails(data.details || []);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (currentEditData) {
      const docRef = doc(db, 'about', currentEditData.id);
      try {
        await updateDoc(docRef, {
          title: editedTitle,
          introText: editedIntroText,
          details: editedDetails,
        });
        fetchAboutData();
        setIsEditing(false);
        setCurrentEditData(null);
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };

  const handleAddParagraph = () => {
    setEditedDetails([...editedDetails, '']);
  };

  const handleRemoveParagraph = (index: number) => {
    const newDetails = editedDetails.filter((_, i) => i !== index);
    setEditedDetails(newDetails);
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newDetails = [...editedDetails];
    newDetails[index] = value;
    setEditedDetails(newDetails);
  };

  const moveParagraphUp = (index: number) => {
    if (index === 0) return;
    const newDetails = [...editedDetails];
    [newDetails[index - 1], newDetails[index]] = [newDetails[index], newDetails[index - 1]];
    setEditedDetails(newDetails);
  };

  const moveParagraphDown = (index: number) => {
    if (index === editedDetails.length - 1) return;
    const newDetails = [...editedDetails];
    [newDetails[index + 1], newDetails[index]] = [newDetails[index], newDetails[index + 1]];
    setEditedDetails(newDetails);
  };

  return (
    <Box
      sx={{
        color: 'black',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      id='about'
    >
      {details ? (
        <span style={{ animation: '1s showAnim forwards' }}>{details}</span>
      ) : (
        <Grid container spacing={4} maxWidth="lg" sx={{ animation: '1s showAnim forwards' }}>
          {aboutDocuments.map((element, index) => (
            <Grid key={index} item xs={12} md={6} sx={{ position: 'relative' }}>
              <IconButton
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => handleEditClick(element)}
              >
                <EditIcon />
              </IconButton>
              <Typography variant="h4" gutterBottom>
                {element.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {element.introText}
              </Typography>
              <Link
                href={'#about'}
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => {
                  setDetails(
                    <AboutDetails
                      title={element.name}
                      text={element.details}
                      backFunction={handleCheckDetails}
                    />
                  );
                }}
              >
                ...więcej
              </Link>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <Box
          sx={{
            color: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            maxHeight: '70vh',
            overflow: 'auto',
            p: 4,
          }}
        >
          <Typography variant="h6">Edycja</Typography>
          <TextField
            fullWidth
            label="Tytuł"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Wstęp"
            value={editedIntroText}
            onChange={(e) => setEditedIntroText(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Szczegółowy opis:
          </Typography>

          {editedDetails.map((paragraph, idx) => (
            <Box key={idx} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                multiline
                label={`Paragraf ${idx + 1}`}
                value={paragraph}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                margin="normal"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                <IconButton onClick={() => moveParagraphUp(idx)} disabled={idx === 0}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                  onClick={() => moveParagraphDown(idx)}
                  disabled={idx === editedDetails.length - 1}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Box>
              <IconButton onClick={() => handleRemoveParagraph(idx)} color="error" sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button onClick={handleAddParagraph} sx={{ mt: 2 }}>
            Dodaj paragraf
          </Button>
          <Button onClick={handleSave} sx={{ mt: 2 }}>
            Zapisz
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default About;
