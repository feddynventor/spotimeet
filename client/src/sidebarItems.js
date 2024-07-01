import React from 'react';
import People from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TourIcon from '@mui/icons-material/Tour';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const mainNavbarItems = [
    {
        icon: <FavoriteIcon />,
        label: 'Artisti preferiti',
        path: '/preferiti'
    },
    {
        icon: <MusicNoteIcon />,
        label: 'Concerti',
        path: '/myGroups'
    },
    {
        icon: <TourIcon/>,
        label: 'Top Gruppi',
        path: '/topGroups'
    },
    {
        icon: <AccountCircleIcon />,
        label: 'Visualizza il tuo profilo',
        path: '/user'
    },
];

export default mainNavbarItems

