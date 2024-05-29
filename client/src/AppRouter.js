import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileCard from './components/ProfileCard';
import ConcertCard from './components/ConcertCard';
import GroupList from './components/GroupList';
import NotFound from './components/NotFound';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/concert" element={<ConcertCard />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;