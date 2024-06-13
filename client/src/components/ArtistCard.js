import React, { useState } from 'react';
import { Card, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme, isFirst }) => ({
  backgroundColor: isFirst ? '#1DB954' :theme.palette.background.paper,
  borderRadius: '20px',
  color: '#fff',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  position: 'relative',
  paddingBottom: theme.spacing(8),
  '&:hover': {
    boxShadow: '10px 10px 20px 0px rgba(255, 255, 255, 0.2)',
  },
}));

const ArtistName = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  width: '100%',
});

const SpotifyLink = styled(Typography)({
  position: 'absolute',
  bottom: 10,
  left: 10,
});

const ArtistCard = ({ artist, isFirst }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleArtistClick = () => {
    if (!artist || !artist._id) {
      setError("ID dell'artista non valido");
    } else {
      navigate(`/artist/${artist.uri}`);
      //navigate(`/artist/${artist.id}`);
    }
  };
  return (
    <StyledCard isFirst={isFirst} onClick={handleArtistClick}>
      <Avatar
        alt={artist.name}
        src={artist.image || 'path_to_default_image.jpg'}
        sx={{ width: 150, height: 150, marginBottom: 2, transition: '.3s ease' }}
      />
      <ArtistName variant={"h5"}>{artist.name}</ArtistName>
      <Typography variant="subtitle1">{`Followers: ${artist.followers}`}</Typography>
    </StyledCard>
  );
};

export default ArtistCard;