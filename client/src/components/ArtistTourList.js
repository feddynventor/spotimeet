import React, { useEffect } from 'react';
import ArtistTour from './ArtistTour'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useArtistGroups } from '../hooks/artists';

export default function ArtistTourList({ artist_id }) {

    const artist = useArtistGroups(artist_id);  //object id

    if (!artist) {  // artist undefined == promise in risoluzione
        return <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {artist === null   // promise risolta con 404
                ? <Typography>L'artista non ha in programma un tour in Italia, unisciti alla chat globale per non perderti gli ultimi aggiornamenti</Typography>
                : artist.tours.map((tour, index) => (
                    <ArtistTour tour={tour} key={index} isFirst={index===0}/>
                ))
            }
        </Box>
    );
}