import  admin  from 'firebase-admin';
import fs from 'fs';
import { v4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import serviceAccount  from "../Data/serviceAccountKey.json"  assert { type: 'json' };

const outputThmbnailPath = `${process.cwd()}/video/thumbnail${v4()}.jpg`;
let outputVideoFile = '';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'watch-video-45073.firebasestorage.app' // Replace with your bucket name
});

// Function to download file from Firebase Storage
export const downloadFile = async (filePath, destination) => {
  outputVideoFile = destination;
  const bucket = admin.storage().bucket();
  const file = bucket.file(filePath);

  // Create a writable stream to the local file
  const destFileStream = fs.createWriteStream(destination);

  // Download the file
  file.createReadStream()
    .on('error', (err) => {
      console.error('Error downloading file:', err);
    })
    .on('finish', () => {
      console.log(`Watchclub File downloaded to ${destination}`);
      createThumbnail(destination);
    })
    .pipe(destFileStream);
};

export const createThumbnail = async (outputVideoPath) => {    
    const bucket = admin.storage().bucket();
 
    const thumbnailTime   = 5;

    // Process the file with FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(outputVideoPath)
      .seekInput(thumbnailTime)
      .frames(1)
      .size("300x300")    
      .output(outputThmbnailPath)
      .on("end", () => {
          console.log(`Thumbnail created successfully:${outputThmbnailPath}`);
          uploadThumbnail(outputThmbnailPath);
      })
      .run();
  
    });
  
    return {
      success: true,      
    };

  }

  export const uploadThumbnail = async (thumbnailPath) => {

    const bucket = admin.storage().bucket();
      // Upload the processed file to storage
    await bucket.upload(thumbnailPath, {
      destination: 'thumbnails/' + `thumbnailPath${v4()}`,
      contentType: 'image/jpeg'

    });

    // Delete the temporary files
    fs.unlinkSync(outputVideoFile);
    fs.unlinkSync(outputThmbnailPath);   
  };