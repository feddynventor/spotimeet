import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import banner from './assets/Banner_Travis.png';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Sidebar from './Sidebar';
import ArtistList from './components/ArtistList';
import ArtistProfile from './components/ArtistProfile';
import Favourites from './components/Favourites';
import ArtistTour from './components/ArtistTour';

import { useUserDetails } from './hooks/users';
import { useArtistSearch } from './hooks/artists';

export default function Main() {
    const user = useUserDetails();
    const [searchResult, search] = useArtistSearch();
    const [cookies, setCookie, removeCookie] = useCookies('token');

    if (!!cookies.token) return <>
            <Sidebar user={user} searchHandler={search} />
            <Container sx={{ boxSizing: "border-box", overflow: "hidden", marginTop: "20px", }} maxWidth="false">
                <Box sx={{ position: 'relative', flexGrow: 1, justifyContent: 'center', display: "flex" }}>
                    <img src={banner} alt='banner pubblicitario' style={{ width: '100%', maxHeight: "20vh", borderRadius: '12px', maxWidth: "1100px", display: "flex" }} />
                </Box>
                <Container sx={{ boxSizing: "border-box", overflow: "hidden" }} maxWidth="false" disableGutters>
                    <Box sx={{
                        overflowY: "auto", overflowX: "hidden",
                        marginTop: "20px", height: "70vh",
                        borderRadius: '12px', backgroundColor: '#332D2A',
                    }}>
                        <Routes>
                            <Route path="/" element={ searchResult && <ArtistList list={searchResult} /> } />
                            <Route path="/artist/:spotify_id?" element={<ArtistProfile />} />
                            <Route path="/artist/tour/:id?" element={<ArtistTour />} />
                            <Route path="/preferiti" element={<Favourites />} />
                        </Routes>
                    </Box>
                </Container>
            </Container>
        </>
    else return (
        <Navigate to="/login" />
    )

}
