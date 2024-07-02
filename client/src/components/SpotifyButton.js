import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import mini_logo from '../assets/Spotify_Icon_CMYK_Black.png';

const useStyles = makeStyles({
    spotifyButton: {
        width: '60%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        border: '4px solid #1DB954',
        borderRadius: '40px',
        backgroundColor: '#1DB954',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '10px',
        // "&:hover": {
        borderColor: '#FFF',
        // }
    },
    spotifyLogo: {
        width: '40px',
        height: '40px',
        marginRight: '10px',
    }
})

export default function SpotifyButton({oauthUrl}) {
    const styles = useStyles();
    return (
        <Box sx={{margin: 3, width: '100%', textAlign: 'center'}}>
        <button 
            className={styles.spotifyButton} 
            onClick={()=>{window.location.href = oauthUrl}}>
            <img src={mini_logo} alt="Spotify logo" className={styles.spotifyLogo} />
            <span>Entra con Spotify</span>
        </button>
        <Typography variant="body1">
            Se hai un account Spotify sei già nel flow!
        </Typography>
        <Typography variant="subtitle" color="#ff0000">
	    Disclaimer! OAuth attivo solo per utenti di Test! API in Dev mode
        </Typography>
        </Box>
    );
}    
