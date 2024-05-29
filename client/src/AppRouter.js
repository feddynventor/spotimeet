import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConcertCard from './components/ConcertCard';
import GroupList from './components/GroupList';
import NotFound from './components/NotFound';
import ArtistProfile from './components/ArtistProfile';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/artist-profile" element={<ArtistProfile />} />
        <Route path="/concert" element={<ConcertCard />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;