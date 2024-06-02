import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Avatar, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ArtistProfile = () => {
  const { id } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [likedCities, setLikedCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("ID dell'artista non valido");
      return;
    }
    fetch(`http://localhost:3000/gruppi.json?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(id => {
        console.log("Dati ottenuti dalla richiesta fetch:", id);
        const artist = id.find(item => item._id === id);
        if (!artist) {
          setError("Artista non trovato");
          return;
        }
        setArtistData(artist);
        if (!artist || !artist.events) {
          setError("City data is missing or in incorrect format");
          console.error("City data is missing or in incorrect format");
          return;
        }
        //setArtistData(data[0]);
        setLikedCities(artist.events.map(() => false));
      })
      .catch(error => {
        setError(error.message);
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleLikeCity = (index) => {
    const newLikedCities = [...likedCities];
    newLikedCities[index] = !newLikedCities[index];
    setLikedCities(newLikedCities);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artistData) {
    return <div>Loading...</div>;
  }

  const { name, followers, image: imageUrl, repo_id } = artistData;
  return (
    <Box sx={{ backgroundColor: '#FF6D2E', borderRadius: '16px', p: 3, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item lg={4} xs={12}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar alt={name} src={imageUrl} sx={{ width: 200, height: 200, mr: 2 }} />
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Typography variant="h2" sx={{ color: '#332D2A', justifyContent:'center' }}>{repo_id}</Typography>
              {/*<Typography variant="subtitle1" sx={{ color: '#332D2A', justifyContent:'center' }}>{followers.toLocaleString()} ascoltatori mensili</Typography>*/}
              <Button sx={{backgroundColor:'#332D2A', color:'#FF6D2E', textTransform: 'none', justifyContent:'center',minWidth:'200px', borderRadius:'15px', '&:hover': {backgroundColor: '#235965',},}}>Start following</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Box gap={2}>
            <Typography variant="h6" sx={{ color: '#332D2A' }}>Cities</Typography>
            <Grid container spacing={2}>
              {artistData.events.map((events, index) => (
                <Grid item lg={3} md={4} xs={6} key={index}>
                  <Card sx={{ display: 'flex', backgroundColor: '#332D2A', mt:1, borderRadius:'10px' }}>
                    <CardContent>
                      <Typography component="div" variant="body1">{new Date(events.date).toLocaleDateString()}</Typography>
                      <Typography variant="body2" color="text.secondary">{events.city}</Typography>
                    </CardContent>
                    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleLikeCity(index)}>
                      {likedCities[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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

