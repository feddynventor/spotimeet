/**
 * Reference
 * https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
 */

import React, { useEffect } from 'react';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container} from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { makeStyles } from '@mui/styles';
import SpotifyButton from './components/SpotifyButton';
import { useNavigate } from 'react-router-dom';
import { processResponse, validateEmail } from './utils';
import Flower1 from './assets/Flower1.svg';
import Flower2 from './assets/Flower2.svg';
import Flower3 from './assets/Flower3.svg';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			Realizzato per l'esame di Fondamenti di Tecnologie Web
			<br />
			<Link color="inherit" href="https://fedele.website/">
				fedele.website
			</Link>
			<br />
			Nicola Cucinella's dream
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		zIndex: 2
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		zIndex: 2
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2),
		zIndex: 2
	}
}));

export default function Login({ theme }) {
	const [error, setError] = React.useState(false);
	const navigate = useNavigate();
	// useEffect(() => {
	// 	console.log("I run everytime this component rerenders")
	// }, []);
	
	const classes = useStyles(theme);

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(e.target.identifier.value, e.target.password.value)
		fetch('http://spotimeet.fedele.website/api/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: e.target.identifier.value,
				email: validateEmail(e.target.identifier.value),
				password: e.target.password.value
			})
		})
		.then( processResponse )
    //.then( Promise.reject )
		.then( () => navigate("/home") )
    .catch( err => Error.prototype.isPrototypeOf(err) ? null : setError(err) )
	}

	useEffect(() => {
		// Imposta lo stile del body tramite JavaScript
		document.body.style.background = 'linear-gradient(90deg, rgba(161,56,147,1) 0%, rgba(98,155,238,1) 100%)';
		document.body.style.height = '100vh'; // Altezza pari all'altezza della viewport
		document.body.style.margin = '0'; // Rimuove il margine predefinito
  	}, []);

	return (
		<Box>
			<img src={Flower1} alt="fiore1" style={{
				width: '50vw',
				height: '50vh',
				zIndex:'-1',
				position: 'absolute',  
				right: '0',            
				top: '20%',            
				transform: 'translateY(-30%)'  
			}}/>
			<img src={Flower2} alt="fiore2" style={{
				width: '25vw',
				height: '25vh',
				zIndex:'-1',
				position: 'absolute',  
				right: '0',            
				top: '50%',            
				transform: 'translateY(-50%)'  
			}}/>
			<img src={Flower3} alt="fiore3" style={{
				width: '40vw',
	            height: '70vh',
                zIndex:'-1',
                position: 'absolute',  
                left: '0',            
                top: '70%',            
                transform: 'translateY(-70%)'  
            }}/>
			<Grid container spacing={2} justifyContent="center">
				<Grid item lg={6} xs={12}>
					<Box sx={{marginTop:'8em'}}> <Typography component="h1" variant='h1'align="center"> Spotimeet </Typography> </Box>
				</Grid>
				<Grid item lg={6} xs={12}>
					<Container component="main" maxWidth="xs" sx={{marginTop:'15em', backgroundColor:'rgba(161,56,147,0.3)', borderRadius:'20px', padding:'20px'}}>
						<div className={classes.paper}>
							<SpotifyButton oauthUrl="http://spotimeet.fedele.website/api/login/oauth" />
							<form className={classes.form} onSubmit={handleLogin}>
								<TextField
									error={!!error}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="identifier"
									label="Email o Nome utente"
									name="identifier"
									autoComplete="email"
									autoFocus
								/>
								<TextField
									error={!!error}
									helperText={error}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									sx={{ borderRadius: 5 }}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									sx={{ mt: 3, mb: 2, borderRadius: 5, padding: 1.5 }}
								>
									Login
								</Button>
								<Grid container>
									<Grid item>
										<Link onClick={()=>{navigate("/signup")}} variant="subtitle" underline="hover">
											{"Non hai ancora un profilo? Creane uno ora"}
										</Link>
									</Grid>
								</Grid>
							</form>
						</div>
						<Box m={6}>
							<Copyright />
						</Box>
					</Container>
				</Grid>
			</Grid>
		</Box>
	);
}
