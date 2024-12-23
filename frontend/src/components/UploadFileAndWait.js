import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import Input from '@mui/material/Input';
import { ref, uploadBytes,  getDownloadURL } from 'firebase/storage'
import { storage } from './firebase';
import { v4 } from 'uuid';
import { firebaseName } from '../Utils/fileNameExtractor'


export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const thumbnailEndpoint = ''; // This should be defined after you create the URL.
    
    if (!file) {
      setSnackbarMessage('Please select a file to upload.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    setSnackbarMessage('Processing...');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  
    const videosListRef = ref(storage, `videos/uploadvideos_${ v4()}`);  
  
    try {
      const snapshot = await uploadBytes(videosListRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      // Generate the file name and thumbnail endpoint
      const fileName = firebaseName(url);
      const encodedUrl = encodeURIComponent(url);
      const thumbnailEndpoint = `http://localhost:5000/api/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}`;
  
      // Now, make the API call
      await axios.get(thumbnailEndpoint);
  
      // On success, update the snackbar message
      setSnackbarMessage('File uploaded successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      // On error, update the snackbar message
      setSnackbarMessage('Error uploading file.');
      setSnackbarSeverity('error');
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}