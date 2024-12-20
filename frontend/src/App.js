import './App.css';
import { useState, useEffect } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { firebaseName } from './Utils/fileNameExtractor'
import axios from 'axios';

function App() {
  const [videoUpload  , setVideoUpload] = useState(null);
  const [videoList,setVideoList] = useState([]);

  const videosListRef = ref(storage, 'thumbnails/');  

  useEffect(() => {
    listAll(videosListRef).then((response) => {
      response.items.forEach((item) => {
         getDownloadURL(item).then((url) => {
          setVideoList((prev) => [...prev, url]);
        });
      });
    });
  },[]); 

  const uploadVideo = () => {  
      if(videoUpload === null) return null;
      const videosListRef = ref(storage, `videos/uploadvideos_${ v4()}`);  
      uploadBytes(videosListRef, videoUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          //generate 
          setVideoList((prev) => [...prev, url]); 
          const fileName = firebaseName(url);
          const encodedUrl = encodeURIComponent(url);
          const response = await axios.get(`http://localhost:5000/api/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}`);
        })
        
      });
  };

 

  return (
    <div className="App">
       <input type="file" onChange={(e) => setVideoUpload(e.target.files[0])} />
      <button onClick={uploadVideo}>Upload image</button>

      {videoList.map((url) => {
        return <img src={url} />
      })}
    </div>
  );
}

export default App; 
