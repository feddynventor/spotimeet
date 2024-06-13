import React, {useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Avatar, Typography, Button, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useArtistDetails } from '../hooks/artists';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import SpotifyLogo from '../assets/Spotify_Icon_CMYK_Black.png';


const SpotifyLink = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 20px',
  border: '4px solid #1DB954',
  textDecoration: 'none',
  color: 'inherit',
  textTransform: 'none',
  minWidth: '150px',
  borderRadius: '15px',
});

const ArtistInfo = ({artist}) => {
  
  if (!artist) {
    return <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>;
  }

  const { name, image: imageUrl, followers, url} = artist;
  return (
    <Box 
      sx={{
        backgroundColor: '#FF6D2E', 
        borderRadius: '16px 16px 0 0', 
        p: 3, 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid container spacing={2} >
          <Grid item lg={4} xs={12} display="flex" justifyContent="center">
            <Avatar alt={name} src={imageUrl}
              sx={{ 
                width: { xs: '100%', sm: '300px' }, 
                height: { xs: 'auto', sm: '300px' },
                maxWidth: '100%', 
                maxHeight: '100%',
              }} />
          </Grid>
          <Grid item lg={8} xs={12} display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h1" sx={{ color: '#332D2A', textAlign: 'center' }}>{name}</Typography>
            <Typography variant="subtitle1" sx={{ color: '#332D2A', textAlign: 'center' }}>
              {followers.toLocaleString()} ascoltatori mensili
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <SpotifyLink component="a" href={url} target="_blank" rel="noopener noreferrer"
                    sx={{ 
                      backgroundColor: '#1DB954', 
                      border: '4px solid #FF6D2E', 
                      color: '#332D2A', 
                      textTransform: 'none', 
                      minWidth: '150px', 
                      borderRadius: '15px', 
                      '&:hover': { backgroundColor: '#332D2A', color:'#1DB954'},
                      mt: 3, 
                    }}
                  >
                    <img src={SpotifyLogo} alt="Spotify Logo" style={{ width: '5%', marginRight: '10px' }} />Ascolta su Spotify
                  </SpotifyLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                sx={{ 
                  backgroundColor: '#332D2A', 
                  color: '#FF6D2E', 
                  textTransform: 'none', 
                  minWidth: '150px',
                  padding: '10px 20px',
                  borderRadius: '15px', 
                  '&:hover': { backgroundColor: '#235965' }, 
                  mt: 3,
                }}
                >
                  <Typography variant="subtitle1">Start following</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ArtistInfo;