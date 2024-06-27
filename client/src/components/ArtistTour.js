import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";

const ArtistTour = ({tour, isFirst}) => {
  const { name, image: imageUrl} = tour
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    setExpanded(isFirst)
  }, []); 

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={!!tour && tour.events.length == 0 ? undefined : handleExpansion}
        sx={{
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={!!tour && tour.events.length == 0 ? undefined : <ExpandMoreIcon />}
          aria-controls="panel1-content"
          id={tour._id}
          sx={{backgroundColor:'#332D2A'}}
        >
          <Box display={'flex'} sx={{alignItems: 'center'}}>
            <Avatar alt={name} src={imageUrl.replace("evo/artwork","222x222")} sx={{ width: 200, height: 200, mr: 2 }} variant="rounded"/>
            <Box gap={2}>
              <Typography variant="h5" sx={{ color: '#FF6D2E', }}>{name}</Typography>
              { !!tour && tour.events.length == 0 ? <Typography sx={{padding:'20px'}}>Siamo spiacenti, al momento non ci sono eventi disponibili per l'artista selezionato</Typography> : null}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor:'#332D2A'}}>
          <Grid container spacing={2}>
            {!!tour && tour.events.map((event, index) => (
              <Grid item lg={3} md={4} xs={12} key={event._id}>
                <Card sx={{ display: 'flex', backgroundColor: '#FF6D2E', mt: 1, borderRadius: '10px' }} onClick={()=>{navigate('/chat/event/'+event._id)}}>
                  <CardContent>
                    <Typography component="div" variant="body1">{
                      new Date(event.date).toLocaleDateString("IT-it", {
                        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
                      })
                    }</Typography>
                    <Typography variant="body2" color="text.secondary">{event.city}</Typography>
                    <Chip sx={{mt:1}}label="Acquista biglietto" onClick={()=> {window.open(event.url, "_blank")}}/>
                  </CardContent>
                  <IconButton sx={{ marginLeft: 'auto' }}>
                    { event.isMember ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ArtistTour;