import React from 'react';
import { Box, Avatar, Typography, Button, Grid } from '@mui/material';
//import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import SpotifyLogo from '../assets/Spotify_Icon_CMYK_Black.png';
import Instangram from '../assets/Instangram.svg';
import Skeleton from '@mui/material/Skeleton';

const Social = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    borderRadius: '50px',
    width: '200px',
    height: '60px',
    textDecoration: 'none',
    textTransform: 'none',
    marginRight: '10px',
    boxShadow: '10px 10px 15px 0px rgba(255, 255, 255, 0.5)'
});
const SpotifyLink = styled(Social)({
    backgroundColor: '#1DB954',
    color: '#332D2A',
    '&:hover': { backgroundColor: '#1DB954' },
});

const InstaLink = styled(Social)({
    background: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
    color: '#000000',
});

function UserInfo ({ user }) {

    return (
        <Box sx={{
            backgroundColor: '#FF6D2E',
            borderRadius: '10px 10px 0 0',
            p: 3,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Grid container spacing={2} >
                    <Grid item lg={4} md={6} xs={12} display="flex" justifyContent="center">
                        <Avatar alt={'immagine profilo'} src={user.profile.photo} sx={{
                            width: { xs: '50%', lg: '250px' },
                            height: { xs: 'auto', lg: '250px' },
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }} />
                    </Grid>
                    <Grid item lg={8} md={6} xs={12} display="flex" flexDirection="column" justifyContent="center">
                        <Typography variant="h1" sx={{ color: '#332D2A'}}>{user.profile.displayName}</Typography>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: '#332D2A'}}>
                                {user.profile.bio}
                            </Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" sx={{ mt: 2 }}>
                            <SpotifyLink href={user.profile.url} target="_blank" rel="noopener noreferrer">
                                <img src={SpotifyLogo} alt="Spotify Logo" style={{ width: '50px' }} /> 
                                <Typography variant="subtitle" sx={{padding:"5px"}}>Segui su spotify</Typography>
                            </SpotifyLink>
                            <InstaLink href={user.profile.url} target="_blank" rel="noopener noreferrer">
                                <img src={Instangram} alt="Instangram Logo" style={{ width: '50px' }} /> 
                                <Typography variant="subtitle" sx={{padding:"5px"}}>Segui su instangram</Typography>
                            </InstaLink>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UserInfo;