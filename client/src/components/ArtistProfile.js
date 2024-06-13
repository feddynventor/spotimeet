import React, {useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Avatar, Typography, Button, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useArtistDetails, useArtistGroups } from '../hooks/artists';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import ArtistInfo from './ArtistInfo';
import ArtistTourList from './ArtistTourList';

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

const ArtistProfile = () => {
  const { spotify_id } = useParams();
  
  const artistData = useArtistDetails(spotify_id);

  if (!artistData) {
    return <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>;
  }

  return (
  <>
  { (spotify_id === "4lianjyuR1tqf6oUX8kjrZ") ? <video controls={true} autoPlay={true} src={"https://catboy.it/franco.mp4"}></video> : null }
  <ArtistInfo artist={artistData}></ArtistInfo>
  <ArtistTourList artist_id={artistData._id}></ArtistTourList>
  </>
  );
};

export default ArtistProfile;

