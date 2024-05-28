import React from 'react';
import People from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TourIcon from '@mui/icons-material/Tour';

export const mainNavbarItems = [
    {
        icon: <FavoriteIcon />,
        label: 'Artisti preferiti',
        route: 'route'
    },
    {
        icon: <MusicNoteIcon />,
        label: 'Concerti',
        route: 'route'
    },
    {
        icon: <TourIcon/>,
        label: 'Tourneè',
        route: 'route'
    },
    {
        icon: <People />,
        label: 'Artisti',
        route: 'route'
    },
    {
        icon: <FavoriteIcon />,
        label: 'Artisti preferiti',
        route: 'route'
    },
];

export default mainNavbarItems

