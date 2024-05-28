import React from 'react';
import { Container, Box, Avatar, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import artistData from "../data";

const ArtistProfile = () => {
    const { name, monthlyListeners, imageUrl, closeToYou, otherCities } = artistData;
  
    return (
      <Box sx={{ backgroundColor: '#FF6D2E', borderRadius: '16px', p: 3, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}>
        <Box display="flex" alignItems="center">
          <Avatar alt={name} src={imageUrl} sx={{ width: 200, height: 200, mr: 2 }} />
          <Box>
            <Typography variant="h2" sx={{ color: '#332D2A' }}>{name}</Typography>
            <Typography variant="subtitle1" sx={{ color: '#332D2A' }}>{monthlyListeners.toLocaleString()} ascoltatori mensili</Typography>
            <Button sx={{backgroundColor:'#332D2A', color:'#FF6D2E', textTransform: 'none', justifyContent:'center',minWidth:'200px', borderRadius:'15px', '&:hover': {backgroundColor: '#235965',},}}>Start following</Button>
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" sx={{ color: '#332D2A' }}>Close to you</Typography>
          <Card sx={{ display: 'flex', mt: 1, backgroundColor: '#332D2A' }}>
            <CardContent>
              <Typography component="div" variant="body1">{closeToYou.date}</Typography>
              <Typography variant="body2" color="text.secondary">{closeToYou.city}</Typography>
              <Typography variant="body2" color="text.secondary">{closeToYou.venue}</Typography>
            </CardContent>
            <IconButton sx={{ marginLeft: 'auto' }}>
              <FavoriteBorderIcon />
            </IconButton>
          </Card>
        </Box>
        <Box mt={4}>
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
                  <IconButton sx={{ marginLeft: 'auto' }}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };

export default ArtistProfile;

