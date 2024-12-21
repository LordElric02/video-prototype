import './App.css';
import { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes,  getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { firebaseName } from './Utils/fileNameExtractor'
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VideoPlayer from './components/VideoPlayer';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { ButtonGroup, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { ThemeProvider   } from '@mui/material/styles';
import { makeStyles   } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import {orange} from  '@mui/material/colors'
import {amber} from  '@mui/material/colors'
import Topography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';  
import { Grid2 } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material/Box';  
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import'fontsource-roboto';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg,rgb(151, 133, 139) 30%,rgb(91, 18, 139) 90%)',
    border: 10,
    marginBottom: 30,
    borderRadius: 15,
    color: 'white',
    padding: '35px 30px',
  },
});

const theme = createTheme({
  typography: {
    h2: {
      fontSize: 36,
      marginBottom: 20
    }
  },
 
});

function ButtonStyled () {
  const classes = useStyles();
  return (
      <Button className={classes.root}>Test Styles</Button>
  );
} 

function CheckboxExample  () {
  const [checked, setChecked] = useState(true);

  return (
    <FormControlLabel control={
      <Checkbox
        checked={checked} 
        icon  = {<DeleteIcon />}
        checkedIcon={<SaveIcon />}
        onChange={(e) => setChecked(e.target.checked)}
        color='primary'
        inputProps={{ 
          'aria-label': 'secondary checkbox'
         }}
      /> }
      label="Testing Checkbox"
      />
  );
}

function App() {
  const [videoUpload  , setVideoUpload] = useState(null);
  const uploadVideo = () => {  
      if(videoUpload === null) return null;
      const videosListRef = ref(storage, `videos/uploadvideos_${ v4()}`);  
      uploadBytes(videosListRef, videoUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          //generate 
          const fileName = firebaseName(url);
          const encodedUrl = encodeURIComponent(url);
          const response = await axios.get(`http://localhost:5000/api/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}`);
        })
        
      });
  };

 

  return (
    <ThemeProvider theme={theme}>
    <Container className="App" maxWidth='lg' backgroundColor='${theme.palette.primary.main}'>
    <div className="App">
        <AppBar position="static" color='secondary'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"  
              color="inherit"
              aria-label="menu" 
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MUI Theeming
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar> 

       <Typography variant='h2'>
          Welcome to MUI
        </Typography>
        <Typography variant='subtitle1' component={'div'}>
          Learn how to use Materils UI
        </Typography>
       <Grid2 container spacing={2}>
          <Grid2 >
              <Paper style={{height:75, width:500}}>
                <VideoPlayer />
              </Paper>
          </Grid2>
          <Grid2 item>
              <Paper style={{height:75, width:250}}>
                <Input
                  accept="image/*" // You can specify file types here
                  id="file-upload"
                  type="file"
                  onChange={(e) => setVideoUpload(e.target.files[0])}
                  
                /> 
                 <ButtonGroup  variant='contained' size='large'>
                  <Button 
                      startIcon={<SaveIcon />}
                      onClick={uploadVideo}>Upload
                  </Button>
                  <Button 
                      startIcon={<DeleteIcon />}
                      onClick={uploadVideo}>Discard
                  </Button>
                  </ButtonGroup>
               </Paper>
          </Grid2>
        </Grid2>
       <CheckboxExample />
     
    </div>
    </Container>
    </ThemeProvider>
  );
} 

export default App; 
