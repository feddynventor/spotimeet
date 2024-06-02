import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArtistCard from '../components/ArtistCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function ArtistList() {
    //const { id } = useParams();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      fetchData();
    }, []);

    /*useEffect(() => {
      if (groups.length > 0) {
        setLoading(false);
      }
    }, [groups]);*/

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
        {groups.map((groupArtist, index) => (
          <Grid item xs={12} sm={index === 0 ? 12 : 6} md={index === 0 ? 12 : 6} lg={index === 0 ? 4 : 2} key={groupArtist._id}>
            <div onClick={() => navigate(`/ArtistProfile/${groupArtist._id}`)}>
              <ArtistCard groupArtist={groupArtist} isFirst={index === 0} />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}