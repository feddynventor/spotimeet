import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

const ArtistTour = ({tour, isFirst}) => {

  const [likedEvents, setLikedEvents] = useState([]);
  
  const handleLikeEvent = (event) => {
    if (likedEvents.indexOf(event) !== -1)
      setLikedEvents(likedEvents.filter((e) => e !== event));
    else
      setLikedEvents([...likedEvents, event]);
    console.log("handleLikeEvent", likedEvents);
    };

  const { name, image: imageUrl, repo_id } = tour

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    setExpanded(isFirst)
  }, []); 

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor:'#332D2A'}}
        >
          <Box display={'flex'} sx={{alignItems: 'center'}}>
            <Avatar alt={name} src={imageUrl.replace("evo/artwork","222x222")} sx={{ width: 200, height: 200, mr: 2 }} variant="rounded"/>
            <Box gap={2}>
              <Typography variant="h5" sx={{ color: '#FF6D2E', }}>{name}</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor:'#332D2A'}}>
          <Grid container spacing={2}>
            {!!tour && tour.events.map((event, index) => (
              <Grid item lg={3} md={4} xs={12} key={event._id}>
                <Card sx={{ display: 'flex', backgroundColor: '#FF6D2E', mt: 1, borderRadius: '10px' }}>
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ArtistTour;