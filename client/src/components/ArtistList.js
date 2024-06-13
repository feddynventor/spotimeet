import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArtistCard from '../components/ArtistCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function ArtistList({ list }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {list === null ? 
          <Typography>Nessun artista trovato</Typography> :
            list.length === 0 ?
            <Typography>Nessun artista trovato</Typography> :
              list.map((artist, index) => (
                <Grid item xs={12} sm={index === 0 ? 12 : 6} md={index === 0 ? 6 : 4} lg={index === 0 ? 4 : 2} key={artist._id}>
                  <ArtistCard artist={artist} isFirst={index === 0} />
                </Grid>
              ))
        }
      </Grid>
    </Box>
  );
}