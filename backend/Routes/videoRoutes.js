import Router from 'express';
import { v4 } from 'uuid';
import { downloadFile, recordecentApprovedVideos } from '../components/firebaseUtils.js';
//import verifyToken   from '../middlewares/auth.js';

const router = Router();
// Middleware to verify token
// router.use(verifyToken);

router.get('/GenerateThumbnail', async (req, res) => {
      const filePath = req.query.filebaseName; 
      const fileUrl = req.query.fileUrl;

      const outputVideoPath = `${process.cwd()}/Video/firebasevideo${v4()}.mp4`;
      
      //download video
      const resp = await downloadFile(filePath, outputVideoPath,fileUrl);
      let count = 0;
      setTimeout(() => {
          console.log('-----------processing async-------------')
          console.log('data')
          console.log('-----------end processing async-------------')
        }, ++count * 1000);

        res.status(200).json({
          success: true,      });
  
})

router.get('/', async (req, res) => {
      
      // Set the Content-Type header to application/json
      res.setHeader('Content-Type', 'application/json');
      const videos = await recordecentApprovedVideos();
      const jsonvideos =JSON.stringify(videos);

      res.json(jsonvideos);
      
})


export default router;
