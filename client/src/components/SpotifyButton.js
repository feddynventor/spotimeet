import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import mini_logo from '../assets/Spotify_Icon_CMYK_Black.png';

const useStyles = makeStyles({
    spotifyButton: {
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
        "&:hover": {
            borderColor: '#FFF',
        }
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
        <>
        <button 
            className={styles.spotifyButton} 
            style={{ width: '60%', margin: '20px', marginBottom: '5px'}}
            onClick={()=>{window.location.href = oauthUrl}}>
            <img src={mini_logo} alt="Spotify logo" className={styles.spotifyLogo} />
            <span>Entra con Spotify</span>
        </button>
        <Typography variant="body2">
            Se hai un account Spotify sei già nel flow!
        </Typography>
        </>
    );
}    