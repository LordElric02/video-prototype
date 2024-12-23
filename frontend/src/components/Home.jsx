import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VideoPlayer from './VideoPlayer';
import Button from '@mui/material/Button';
import { ThemeProvider   } from '@mui/material/styles';
import { makeStyles   } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';  
import { Grid2 } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { UploadVideoMui } from './UploadVideoMui';
import Typography from '@mui/material/Typography';
import SearchVideos from './SearchVideos';
import    { useState } from 'react';
import { Auth } from './Auth';
import  { useAuth } from './AuthContext';



import'fontsource-roboto';
import MyAppBar from './AppBar';


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

function Home() {
  const { user, login, logout } = useAuth();

  return (
      <Container>
        <MyAppBar />
        
        {user ? (
          <Grid2 container spacing={2}>
              {/* Row 1: Component A */}
              <Grid2 item xs={12} alignContent={'center'}>
                  <Auth />
              </Grid2>
              {/* Row 2: Component B */}
              <br />
              
              {/* Row 3: Components C and D */}
              <Grid2 item xs={12} alignContent={'center'}>
                  <SearchVideos />
              </Grid2>
              <Grid2 container item xs={12} spacing={2} alignItems="flex-start" > {/* Align items to the top */}
            
                      <Grid2 item xs={8}> {/* Adjust this value for more/less space for C */}
                          <VideoPlayer />
                      </Grid2>
                      <Grid2 item xs={4}> {/* D will take the remaining space */}
                          <UploadVideoMui />
                      </Grid2>
                  </Grid2>
          </Grid2>
        ) : (
              <Grid2 container spacing={2}>
                {/* Row 1: Component A */}
                <Grid2 item xs={12} alignContent={'center'}>
                    <Auth />
                </Grid2>
                {/* Row 2: Component B */}
                <br />
              
                {/* Row 3: Components C and D */}
                <Grid2 item xs={12} alignContent={'center'}>
                    <SearchVideos />
                </Grid2>
                <Grid2 container item xs={12} spacing={2} alignItems="flex-start" > {/* Align items to the top */}
            
                        <Grid2 item xs={12}> {/* Adjust this value for more/less space for C */}
                            <VideoPlayer />
                        </Grid2>
                        
                    </Grid2>
            </Grid2>              
        )
        }
        
    </Container>
  );
} 

export default Home; 
