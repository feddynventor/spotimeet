import React from 'react';
import { Card, Typography, Avatar, Button, Box, Badge } from '@mui/material';
import { styled } from '@mui/system';
//import gradiente from '../assets/gradiente.jpg'; ci ho provato bro ma non ci sono riuscito

const StyledCard = styled(Card)(({ theme}) => ({
  backgroundImage: 'url("https://i.pinimg.com/564x/e7/cf/8f/e7cf8fb335799451022f72210a6e691a.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '30px',
  color: '#fff',
  padding: theme.spacing(3),
  margin: '15px',
  display: 'flex',
  flexDirection: 'column',
  //alignItems: 'center',
  position: 'relative',
  '&:hover': {
    boxShadow:'10px 10px 20px 0px rgba(255, 255, 255, 0.2)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#57AA9F',
  borderRadius: '15px',
  padding: theme.spacing(1, 2),
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#fff',
  marginTop: theme.spacing(2),
  width: '100%',
  cursor: 'pointer',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#235965',
  },
}));

const EventInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
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
  //padding: theme.spacing(0.5, 1),
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
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
        sx={{ width: 150, height: 150, marginBottom: 2, transition: '.3s ease' }}
      />
      <EventInfo>
        <ConcertBadge>Concerto</ConcertBadge>
        <Typography variant="subtitle1">{group.dat}</Typography>
        <Typography variant="h5">{group.name}</Typography>
      </EventInfo>
      <StyledButton variant="contained">Entra nella chat</StyledButton>
    </StyledCard>
  );
};

export default ConcertCard;