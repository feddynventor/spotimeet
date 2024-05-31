import React from 'react';
import { Card, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px',
  color: '#fff',
  padding: theme.spacing(3),
  margin: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  '&:hover': {
    boxShadow: '10px 10px 20px 0px rgba(255, 255, 255, 0.2)',
  },
}));

const EventInfo = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const ArtistCard = ({ groupArtist }) => {
    return (
      <StyledCard>
        <Avatar
          alt={groupArtist.name}
          src={groupArtist.image || 'path_to_default_image.jpg'}
          sx={{ width: 150, height: 150, marginBottom: 2, transition: '.3s ease' }}
        />
        <EventInfo>
          <Typography variant="h5">{groupArtist.name}</Typography>
          {/*<Typography variant="subtitle1">{`Followers: ${groupArtist.followers}`}</Typography>*/}
          <Typography variant="subtitle2">
            <a href={groupArtist.url} target="_blank" rel="noopener noreferrer">
              Spotify Profile
            </a>
          </Typography>
        </EventInfo>
      </StyledCard>
    );
  };

export default ArtistCard;