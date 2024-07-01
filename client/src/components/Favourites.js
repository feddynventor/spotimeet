import ArtistList from "./ArtistList";
import { useUserFavourites } from "../hooks/users";
import { Box, Typography } from '@mui/material';
import CustomSkeleton from "./CustomSkeleton";

export default function Favourites({ number }) {
    const favourites = useUserFavourites( number || 50);

    if (!favourites) return <CustomSkeleton />
    else return favourites.length === 0 ? 
        <Typography variant="h5">Nessun artista trovato</Typography> : 
        <Box>
            <Box sx={{backgroundColor: '#FF6D2E', borderRadius: '0px 0px 10px 0px',p:2, mb:2, width:'60%'}}><Typography variant="h4" sx={{color: '#332D2A'}}>I tuoi artisti preferiti</Typography></Box>
            <ArtistList list={favourites} indexes/>
        </Box>
}