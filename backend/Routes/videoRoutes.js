import Router from 'express';
import { v4 } from 'uuid';
import { downloadFile } from '../components/firebaseUtils.js';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
//import verifyToken   from '../middlewares/auth.js';

const router = Router();
// Middleware to verify token
// router.use(verifyToken);

router.get('/GenerateThumbnail', async (req, res) => {
      const filePath = req.query.filebaseName; 
      const fileUrl = req.query.fileUrl;

      console.log(`filePath: ${fileUrl}`);  
      
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


export default router;
