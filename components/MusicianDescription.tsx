import { Box, Typography, Avatar, Modal } from '@mui/material'
import React, { useState } from 'react'

interface MusiacianDescriptionProps {
  name: string
  text: string
  photo: string
  instrument: string
}

const MusiacianDescription = ({ name, text, photo, instrument }: MusiacianDescriptionProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box           
        onClick={handleOpen} 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        padding={2} 
        border="1px solid grey"
        borderRadius={4}
        bgcolor={''}
        width={300}
        sx={{outline: 'none', border: 'none',
          transition: '.5s',
          '&:hover': {
            backgroundColor: '#f4f4f4',
            color: 'black',
            cursor: 'pointer'
          }
        }}

>
        <Avatar 
          src={photo} 
          alt={name} 
          sx={{ width: 100, height: 100 }} 
        />
        <Typography variant="h6" mt={2}>
          {name}
        </Typography>
        <Typography variant="body1">
          {instrument}
        </Typography>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        
        aria-describedby="modal-description"
      >
        <Box 
          display="flex"
          flexDirection="column"
          justifyContent="center"
          border="none"
          width={'100vw'}
          alignItems="center"
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform:"translate(-50%, -50%)",
            color: 'white',
            outline: 'none'

          }}
          bgcolor="rgba(0, 0, 0, .6)"
          p={4}
          borderRadius={2}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <Box onClick={handleClose} sx={{ mt: 2, color: 'black', cursor:'pointer' }}>
            Zamknij
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default MusiacianDescription;
