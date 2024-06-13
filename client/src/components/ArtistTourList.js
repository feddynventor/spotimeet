import React, { useEffect } from 'react';
import ArtistTour from './ArtistTour'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useArtistGroups } from '../hooks/artists';

export default function ArtistTourList({ artist_id }) {

    const tour = useArtistGroups(artist_id);

    if (!tour) {
        return <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {tour === null ? 
                <Typography>L'artista non ha in programma un tour in Italia, unisciti alla chat globale per non perderti gli ultimi aggiornamenti</Typography> :
                tour.map((tour, index) => (
                    <ArtistTour tour={tour} key={index} isFirst={index===0}/>
                ))
            }
        </Box>
    );
}