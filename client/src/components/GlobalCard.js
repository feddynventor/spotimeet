import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Box, Badge } from '@mui/material';
import { styled } from '@mui/system';
import Burano from '../assets/Burano.png';

const FlipCard = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  margin: '20px',
  height: '300px',
  position: 'relative',
  '&:hover $flipCardInner': {
    transform: 'rotateY(180deg)',
  },
}));

const FlipCardInner = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 1s',
  transformStyle: 'preserve-3d',
  borderRadius: '30px',
}));

const FlipCardSide = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FlipCardFront = styled(FlipCardSide)(({ theme }) => ({
  backgroundImage: `url(${Burano})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  color: 'black',
}));

const FlipCardBack = styled(FlipCardSide)(({ theme, artistImage }) => ({
  transform: 'rotateY(180deg)',
  backgroundImage: `url(${artistImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: '15px',
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: '#fff',
  marginTop: theme.spacing(2),
  cursor: 'pointer',
  alignItems: 'center',
  border: '1px solid #FF6D2E',
  transition: 'background-color 0.5s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
}));

const EventInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
}));

const ConcertBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: 'rgba(	255, 109, 46, 0.8)',
  color: 'white',
  borderRadius: '16px',
  padding: theme.spacing(0.5, 1),
  marginBottom: theme.spacing(1),
  position: 'absolute',
  left: 20,
  top: 20,
}));

const ChatBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: '#ff7043',
  color: '#fff',
  borderRadius: '16px',
  padding: theme.spacing(0.5, 1),
  position: 'absolute',
  bottom: 20,
}));

const GlobalCard = ({ group }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate(false);
  const artistImage = group.event ? group.event.tour.image : group.artist.image;

  useEffect(() => {
    console.log(group.artist)
  },[])
  return (
    <FlipCard onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <FlipCardInner className="flipCardInner" style={{ transform: hover ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <FlipCardFront>
          <EventInfo>
              <>
                <Typography variant="h3" sx={{whiteSpace: 'normal', color:'white'}}>{group.artist.name}</Typography>
                <ConcertBadge>Artista</ConcertBadge>
                <ChatBadge>Membri: {group.members}</ChatBadge>
              </>
          </EventInfo>.
        </FlipCardFront>
        <FlipCardBack artistImage={artistImage}>
          <StyledButton onClick={()=>{navigate('/chat/artist/'+group.artist._id)}} variant="contained">Entra nella chat</StyledButton>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCard>
  );
};

export default GlobalCard;