import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import { storage } from '../firebase';
import { ref, uploadBytes,  getDownloadURL } from 'firebase/storage'
import { firebaseName } from '../Utils/fileNameExtractor'

// Sample video data

const VideoPlayer  =() =>{
  const [videos, setVideoList] = useState([]); 
  const [currentVideo, setCurrentVideo] = useState(null);

  //console.log(`testdata: ${testdata[0]}`);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        const tempArray = JSON.parse(response.data);
        setVideoList(tempArray);  
 
      } catch (err) {   
        console.log(err);
      } finally {
        console.log('finallyx');
       
      }
    };

    fetchVideos();
 
  }, []);


  const handleThumbnailClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  return (
    <div style={styles.container}>
      <video controls style={styles.video} src={currentVideo} />
      <div style={styles.thumbnailContainer}>
        {videos.map((video, index) => (
          <img
            key={index}
            src={video.thumbnailUrl}
            alt={`Thumbnail ${index + 1}`}
            style={styles.thumbnail}
            onClick={() => handleThumbnailClick(video.videoUrl)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  video: {
    width: '80%',
    maxHeight: '60vh',
    marginBottom: '20px',
  },
  thumbnailContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: '120px',
    height: 'auto',
    margin: '5px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'border 0.2s',
  },
};

export default VideoPlayer;
