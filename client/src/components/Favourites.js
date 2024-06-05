import { Typography } from "@mui/material";
import ArtistList from "./ArtistList";
import { useUserFavourites } from "../hooks/users";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function Favourites() {
    const favourites = useUserFavourites();

    useEffect(() => {
        console.log(favourites);
    })

    if (!favourites) return <CircularProgress />
    else return favourites.length === 0 ? 
        <Typography variant="h5">Nessun artista trovato</Typography> : 
        <><Typography variant="h4" sx={{m: 2}}>I tuoi preferiti</Typography><ArtistList list={favourites} /></>
}