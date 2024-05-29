import React, { useState } from 'react';
import { Container, Box, Avatar, Typography, Button, Card, CardContent, Grid, IconButton, ListItem } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import artistData from "../data";

const ArtistProfile = () => {
    const { name, monthlyListeners, imageUrl, closeToYou, otherCities } = artistData;

    const [isLikedCloseToYou, setIsLikedCloseToYou] = useState(false);
    const [likedOtherCities, setLikedOtherCities] = useState(otherCities.map(() => false));
  
    const handleLikeCloseToYou = () => {
      setIsLikedCloseToYou(!isLikedCloseToYou);
    };
  
    const handleLikeOtherCity = (index) => {
      const newLikedOtherCities = [...likedOtherCities];
      newLikedOtherCities[index] = !newLikedOtherCities[index];
      setLikedOtherCities(newLikedOtherCities);
    };
  
    return (
      <Box sx={{ backgroundColor: '#FF6D2E', borderRadius: '16px', p: 3, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item lg={2} xs={12}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Avatar alt={name} src={imageUrl} sx={{ width: 200, height: 200, mr: 2 }} />
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Typography variant="h2" sx={{ color: '#332D2A', justifyContent:'center' }}>{name}</Typography>
                <Typography variant="subtitle1" sx={{ color: '#332D2A', justifyContent:'center' }}>{monthlyListeners.toLocaleString()} ascoltatori mensili</Typography>
                <Button sx={{backgroundColor:'#332D2A', color:'#FF6D2E', textTransform: 'none', justifyContent:'center',minWidth:'200px', borderRadius:'15px', '&:hover': {backgroundColor: '#235965',},}}>Start following</Button>
              </Box>
            </Box>
          </Grid>
            <Grid item lg={10} xs={12}>
              <Box>
                <Typography variant="h6" sx={{ color: '#332D2A' }}>Close to you</Typography>
                <Card sx={{ display: 'flex', mt: 1, backgroundColor: '#332D2A' }}>
                  <CardContent>
                    <Typography component="div" variant="body1">{closeToYou.date}</Typography>
                    <Typography variant="body2" color="text.secondary">{closeToYou.city}</Typography>
                    <Typography variant="body2" color="text.secondary">{closeToYou.venue}</Typography>
                  </CardContent>
                  <IconButton sx={{ marginLeft: 'auto',}} onClick={handleLikeCloseToYou}>
                  {isLikedCloseToYou ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Card>
              </Box>
              <Box gap={2}>
                <Typography variant="h6" sx={{ color: '#332D2A' }}>Other cities</Typography>
                <Grid container spacing={2}>
                  {otherCities.map((event, index) => (
                    <Grid item lg={2} xs={6} key={index}>
                      <Card sx={{ display: 'flex', backgroundColor: '#332D2A', mt:1 }}>
                        <CardContent>
                          <Typography component="div" variant="body1">{event.date}</Typography>
                          <Typography variant="body2" color="text.secondary">{event.city}</Typography>
                          <Typography variant="body2" color="text.secondary">{event.venue}</Typography>
                        </CardContent>
                        <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleLikeOtherCity(index)}>
                        {likedOtherCities[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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

export default ArtistProfile;

