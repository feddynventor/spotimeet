import React from 'react';
import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import banner from './assets/Banner_Travis.png';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Sidebar from './Sidebar';
import ArtistList from './components/ArtistList';
import ArtistProfile from './components/ArtistProfile';
import Favourites from './components/Favourites';
import ArtistTour from './components/ArtistTour';
import Chat from './components/Chat';
import UserProfile from './components/UserProfile';
import GroupList from './components/GroupList';
import CustomSkeleton from './components/CustomSkeleton';

import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link';

import { useUserDetails } from './hooks/users';
import { useArtistSearch } from './hooks/artists';
import { useCitySearch } from './hooks/groups';
import { useState, useEffect } from 'react';

export default function Main({ theme }) {
    const user = useUserDetails();
    const [artistSearchResult, searchArtist] = useArtistSearch();
    const [citySearchResult, searchCity] = useCitySearch();
    const [query, search] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies('token');

    useEffect(() => {
        searchArtist(query);
        searchCity(query);
    }, [query]);

    if (!!cookies.token) return <Box sx={{ display: 'flex', background: theme.palette.background.app }}>
            <Sidebar user={user} searchHandler={search} />
            <Container sx={{ boxSizing: "border-box", overflow: "hidden", marginTop: "20px" }} maxWidth="false">
                <Link underline='none' component={RouterLink} to='/artist/0Y5tJX1MQlPlqiwlOH1tJY'>
                    <Box sx={{ position: 'relative', flexGrow: 1, justifyContent: 'center', display: "flex" }}>
                        <img src={banner} alt='banner pubblicitario' style={{ width: '100%', maxHeight: "20vh", borderRadius: '12px', maxWidth: "1100px", display: "flex" }} />
                    </Box>
                </Link>
                <Container sx={{ boxSizing: "border-box", overflow: "hidden" }} maxWidth="false" disableGutters>
                    <Box sx={{
                        overflowY: "auto", overflowX: "hidden",
                        marginTop: "20px", height: "70vh",
                        borderRadius: '12px', backgroundColor: '#332D2A', scrollbarWidth: 'none'
                    }}>
                        <Routes>
                            <Route path="/" element={
                                citySearchResult && citySearchResult.length>0 && <GroupList list={citySearchResult} />
                                || artistSearchResult && artistSearchResult.length>0 && <ArtistList list={artistSearchResult} />
                                || <GroupList></GroupList>
                                || <CustomSkeleton></CustomSkeleton>
                            } />
                            <Route path="/artist/:spotify_uri" element={<ArtistProfile />} />
                            <Route path="/preferiti" element={<Favourites />} />
                            <Route path="/myGroups" element={<GroupList key="myGroups" /> } />
                            <Route path="/topGroups" element={<GroupList key="topGroups" modificatore="top" /> } />
                            <Route path="/chat/event/:id" element={<Chat type="event"/>} />
                            <Route path="/chat/artist/:id" element={<Chat type="global"/>} />
                            <Route path="/user" element={<UserProfile />} />
                        </Routes>
                    </Box>
                </Container>
            </Container>
        </Box>
    else return (
        <Navigate to="/home/login" />
    )

}
