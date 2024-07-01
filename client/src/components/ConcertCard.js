import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Badge } from '@mui/material';
import { styled } from '@mui/system';
import Sky from '../assets/Sky.png';


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
  backgroundImage: `url(${Sky})`,
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

const DateBadge = styled(Box)(({ theme }) => ({
  backgroundColor: '#2E3DFF',
  color: 'white',
  borderRadius: '16px',
  padding: theme.spacing(0.5, 1),
  marginBottom: theme.spacing(1),
  position: 'absolute',
  right: 20,
  top: 20,
}));

const ConcertBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: '#2E3DFF',
  color: 'white',
  borderRadius: '16px',
  padding: theme.spacing(0.5, 1),
  marginBottom: theme.spacing(1),
  position: 'absolute',
  left: 20,
  top: 20,
}));

const ChatBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: '#2E3DFF',
  color: '#fff',
  borderRadius: '16px',
  padding: theme.spacing(0.5, 1),
  position: 'absolute',
  bottom: 20,
}));

const ConcertCard = ({ group }) => {
  const [hover, setHover] = useState(false);
  const eventImage = group.artist.image;
  const navigate = useNavigate();

  return (
    <FlipCard onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <FlipCardInner className="flipCardInner" style={{ transform: hover ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <FlipCardFront>
          <EventInfo>
              <>
                <Typography variant="h3" sx={{whiteSpace: 'normal', color:'white'}}>{group.artist.name}</Typography>
                <EventInfo>
                  <Typography variant="h5" align='center' sx={{whiteSpace: 'normal', color:'white'}}>{group.event.city}</Typography>
                </EventInfo>
                <ConcertBadge>Evento</ConcertBadge>
                <ChatBadge>{ !!group.members ? ("Membri: "+group.members) : "Entra per primo" }</ChatBadge>
                <DateBadge>{new Date(group.event.date).toLocaleDateString('it-IT', { weekday: 'short', year: '2-digit', month: 'long', day: 'numeric' })}</DateBadge>
              </>
          </EventInfo>
        </FlipCardFront>
        <FlipCardBack artistImage={eventImage}> 
          <StyledButton onClick={()=>{navigate('/chat/event/'+group.event._id)}} variant="contained">Entra nella chat</StyledButton>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCard>
  );
};

export default ConcertCard;