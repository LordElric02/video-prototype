import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FileUpload = (thumbnailEndpoint) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    // Show "Processing" toast
    const toastId = toast.info('Processing...', {
      autoClose: false, // Prevent auto close
      closeOnClick: false,
      draggable: false,
    });

    try {
      // Replace with your API endpoint
      await axios.get(thumbnailEndpoint);

      // On success, update the toast
      toast.update(toastId, {
        render: 'File uploaded successfully!',
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      });
    } catch (error) {
      // On error, update the toast
      toast.update(toastId, {
        render: 'Error uploading file.',
        type: toast.TYPE.ERROR,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};;
