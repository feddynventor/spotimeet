import React from 'react';
import { Box, Avatar, Typography, Button, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import SpotifyLogo from '../assets/Spotify_Icon_CMYK_Black.png';


const SpotifyLink = styled(Button)({
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: '10px 20px',
    // textDecoration: 'none',
    margin: 0,
    borderRadius: '15px',
    backgroundColor: '#1DB954', 
    border: '4px solid #FF6D2E', 
    color: '#332D2A', 
    textTransform: 'none', 
    minWidth: '150px', 
    borderRadius: '15px',
    '&:hover': { backgroundColor: '#332D2A', color:'#1DB954'},
});

const btnFollow = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    textDecoration: 'none',
    border: '4px solid #FF6D2E',
    textTransform: 'none', 
    minWidth: '150px', 
    borderRadius: '15px',
    backgroundColor: '#332D2A', 
    color: '#FF6D2E',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#235965' },
});

const ArtistInfo = ({artist}) => {
  
  if (!artist) {
    return <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>;
  }

  const { name, image: imageUrl, followers, url} = artist;
  return (
    <Box sx={{
        backgroundColor: '#FF6D2E', 
        borderRadius: '16px 16px 0 0', 
        p: 3, 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
    }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid container spacing={2} >
            <Grid item lg={4} xs={12} display="flex" justifyContent="center">
                <Avatar alt={name} src={imageUrl} sx={{ 
                    width: { xs: '50%', lg: '250px' }, 
                    height: { xs: 'auto', lg: '250px' },
                    maxWidth: '100%', 
                    maxHeight: '100%',
                }} />
            </Grid>
            <Grid item lg={8} xs={12} display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="h2" sx={{ color: '#332D2A', textAlign: 'center' }}>{name}</Typography>
                <Typography variant="subtitle1" sx={{ color: '#332D2A', textAlign: 'center' }}>
                    {followers.toLocaleString()} followers
                </Typography>
                <Grid container spacing={2} sx={{m: 2}}>
                    <Grid item xs={12} sm={6}>
                        <SpotifyLink component="a" href={url} target="_blank" rel="noopener noreferrer">
                            <img src={SpotifyLogo} alt="Spotify Logo" style={{ width: '5%', marginRight: '10px' }} />
                            Ascolta su Spotify
                        </SpotifyLink>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="error">sdsdsd</Button>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}> */}
                    {/* </Grid> */}
                </Grid>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ArtistInfo;