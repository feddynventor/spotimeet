import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Avatar, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useArtistGroups } from '../hooks/artists';
import CircularProgress from '@mui/material/CircularProgress';

const ArtistTour = ({tour}) => {

  const [likedEvents, setLikedEvents] = useState([]);
  
  const handleLikeEvent = (event) => {
    if (likedEvents.indexOf(event) !== -1)
      setLikedEvents(likedEvents.filter((e) => e !== event));
    else
      setLikedEvents([...likedEvents, event]);
    console.log("handleLikeEvent", likedEvents);
    };

  const { name, image: imageUrl, repo_id } = tour
  return (
    <Box sx={{ backgroundColor: '#FF6D2E', borderRadius: '0 0 16px 16px', p: 3, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item lg={4} xs={12}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar alt={name} src={imageUrl} sx={{ width: 200, height: 200, mr: 2 }} />
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Typography variant="h2" sx={{ color: '#332D2A', justifyContent: 'center' }}>{name}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Box gap={2}>
            <Typography variant="h6" sx={{ color: '#332D2A' }}>Cities</Typography>
            <Grid container spacing={2}>
              {!!tour && tour.events.map((event, index) => (
                <Grid item lg={3} md={4} xs={6} key={event._id}>
                  <Card sx={{ display: 'flex', backgroundColor: '#332D2A', mt: 1, borderRadius: '10px' }}>
                    <CardContent>
                      <Typography component="div" variant="body1">{
                        new Date(event.date).toLocaleDateString("IT-it", {
                          year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
                        })
                      }</Typography>
                      <Typography variant="body2" color="text.secondary">{event.city}</Typography>
                      {/* <Button sx={{ backgroundColor: '#FF6D2E', color: '#332D2A', textTransform: 'none', justifyContent: 'center', minWidth: '200px', borderRadius: '15px', '&:hover': { backgroundColor: '#235965', }, }}>96 membri</Button> */}
                    </CardContent>
                    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleLikeEvent(event._id)}>
                      {likedEvents.indexOf(event._id)!==-1 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistTour;