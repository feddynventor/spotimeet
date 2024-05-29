import React, { useState, useEffect } from 'react';
import { Container, Box, Avatar, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ArtistProfile = () => {
  const [artistData, setArtistData] = useState(null);
  const [likedcity, setLikedcity] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.fedele.website/ticketone/nayt')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data || !data[0] || !data[0].dates) {
          setError("City data is missing or in incorrect format");
          console.error("City data is missing or in incorrect format");
          return;
        }
        setArtistData(data[0]);
        setLikedcity(data[0].dates.map(() => false));
      })
      .catch(error => {
        setError(error.message);
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLikeCity = (index) => {
    const newLikedcity = [...likedcity];
    newLikedcity[index] = !newLikedcity[index];
    setLikedcity(newLikedcity);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artistData) {
    return <div>Loading...</div>;
  }

  const { name, /*monthlyListeners,*/ imageUrl, city } = artistData;
  
    return (
      <Box sx={{ backgroundColor: '#FF6D2E', borderRadius: '16px', p: 3, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item lg={2} xs={12}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Avatar alt={name} src={imageUrl} sx={{ width: 200, height: 200, mr: 2 }} />
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Typography variant="h2" sx={{ color: '#332D2A', justifyContent:'center' }}>{name}</Typography>
                {/*<Typography variant="subtitle1" sx={{ color: '#332D2A', justifyContent:'center' }}>{monthlyListeners.toLocaleString()} ascoltatori mensili</Typography>*/}
                <Button sx={{backgroundColor:'#332D2A', color:'#FF6D2E', textTransform: 'none', justifyContent:'center',minWidth:'200px', borderRadius:'15px', '&:hover': {backgroundColor: '#235965',},}}>Start following</Button>
              </Box>
            </Box>
          </Grid>
            <Grid item lg={10} xs={12}>
              <Box gap={2}>
                <Typography variant="h6" sx={{ color: '#332D2A' }}>Cities</Typography>
                <Grid container spacing={2}>
                  {artistData.dates.map((city, index) => (
                    <Grid item lg={2} xs={6} key={index}>
                      <Card sx={{ display: 'flex', backgroundColor: '#332D2A', mt:1, borderRadius:'10px' }}>
                        <CardContent>
                          <Typography component="div" variant="body1">{city.date}</Typography>
                          <Typography variant="body2" color="text.secondary">{city.city}</Typography>
                          <Typography variant="body2" color="text.secondary">{city.venue}</Typography>
                        </CardContent>
                        <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleLikeCity(index)}>
                        {likedcity[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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

