import React from 'react';
import { Card, Typography, Avatar, Button, Box, Badge } from '@mui/material';
import { styled } from '@mui/system';
//import gradiente from '../assets/gradiente.jpg';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundImage: 'url("gradiente")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'linear-gradient(135deg, #ff8a65, #ff6f00)',
  borderRadius: '12px',
  color: '#fff',
  padding: theme.spacing(3),
  margin: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#6fbf73',
  color: '#fff',
  marginTop: theme.spacing(2),
  width: '100%',
  '&:hover': {
    backgroundColor: '#57a55f',
  },
}));

const EventInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const ConcertBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: '#fff',
  borderRadius: '16px',
  padding: theme.spacing(0.5, 1),
  marginBottom: theme.spacing(1),
}));

const ChatBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: '#ff7043',
  color: '#fff',
  borderRadius: '50%',
  padding: theme.spacing(0.5, 1),
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  height: '32px',
  width: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ConcertCard = ({group}) => {
  return (
    <StyledCard>
      <ChatBadge badgeContent={256} />
      <Avatar
        alt="Coldplay"
        src="path_to_coldplay_image.jpg"
        sx={{ width: 60, height: 60, marginBottom: 2 }}
      />
      <EventInfo>
        <ConcertBadge>Concerto</ConcertBadge>
        <Typography variant="subtitle1">{group.dat}</Typography>
        <Typography variant="h6">{group.name}</Typography>
      </EventInfo>
      <StyledButton variant="contained">Entra nella chat</StyledButton>
    </StyledCard>
  );
};

export default ConcertCard;