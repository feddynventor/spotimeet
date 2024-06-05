import React from 'react';
import People from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TourIcon from '@mui/icons-material/Tour';

export const mainNavbarItems = [
    {
        icon: <FavoriteIcon />,
        label: 'Artisti preferiti',
        path: '/preferiti'
    },
    {
        icon: <MusicNoteIcon />,
        label: 'Concerti',
        path: '/artistProfile'
    },
    {
        icon: <TourIcon/>,
        label: 'Tourneè',
        path: '/artistList'
    },
    {
        icon: <People />,
        label: 'Artisti',
        route: 'route'
    },
];

export default mainNavbarItems

