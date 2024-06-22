/**
 * Reference
 * https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
 */

import React, { useEffect } from 'react';
import { Button, TextField, Link, Grid, Box, Typography, Container} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SpotifyButton from './components/SpotifyButton';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { processResponse, validateEmail } from './utils';


const useStyles = makeStyles(() => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// zIndex: 2
	},
	avatar: {
		//margin: theme.spacing(1),
		//backgroundColor: theme.palette.secondary.main,
		// zIndex: 2
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: 2,
		// zIndex: 2
	}
}));

export default function Login({ footer }) {
	const [error, setError] = React.useState(false);
	const navigate = useNavigate();
	const classes = useStyles();
    const [cookies, setCookie, removeCookie] = useCookies('token');

	const handleLogin = (e) => {
		e.preventDefault();
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
		.then( token => setCookie('token', token.token, {
			sameSite: 'strict',
			path: '/'
		}) )
		.then( () => navigate("/") )
    	.catch( err => Error.prototype.isPrototypeOf(err) ? null : setError(err) )
	}

	return (
		<Container component="main" maxWidth="xs" sx={{backgroundColor:'rgba(1,1,1,0.5)', borderRadius:'20px', padding:'20px'}}>
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
							<Link onClick={()=>{navigate("/home/signup")}} variant="subtitle" underline="hover">
								{"Non hai ancora un profilo? Creane uno ora"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box m={6}>
				{footer}
			</Box>
		</Container>
	);
}
