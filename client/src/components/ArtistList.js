import * as React from 'react';
import ArtistCard from './ArtistCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ArtistList() {
    const { id } = useParams();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(id);
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/ricerca.json');
            const data = await response.json();
            setGroups(data);
            setLoading(false);
        } catch (error) {
            console.error('Errore nel recupero dei dati:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!groups || !Array.isArray(groups) || groups.length === 0) {
        return <div>No groups available</div>;
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {groups.map((groupArtist) => (
            <Grid item xs={12} sm={6} md={6} lg={2} key={groupArtist._id}>
              <ArtistCard groupArtist={groupArtist} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
}