/**
 * Reference
 * https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
 */

import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import SpotifyButton from './components/SpotifyButton';
import { useNavigate } from 'react-router-dom';
import { processResponse, validateEmail } from './utils';

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
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2),
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

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<GraphicEqIcon />
				</Avatar>
				<Typography component="h1" variant="h4" >
					Spotimeet
				</Typography>
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
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
					<Grid container>
						<Grid item>
							<Link onClick={()=>{navigate("/signup")}} variant="body2" underline="hover">
								{"Se vuoi creare un nuovo account, clicca qui"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box m={6}>
				<Copyright />
			</Box>
		</Container>
	);
}
