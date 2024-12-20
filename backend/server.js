import express from "express";
import {  downloadFile } from "./components/firebaseUtils.js";
import videoRoutes from "./Routes/videoRoutes.js";
import { v4 } from 'uuid';


const filePath = 'videos/Screen_Recording_20241211_115130_WatchClubTV.mp484bd0119-a983-4354-b91a-fc7400095718';
//testiing some stoff


const app = express();

app.use('/api/videos', videoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {            
  console.log("Server started on port 5000");        
});     

