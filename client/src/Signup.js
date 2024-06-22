/**
 * Reference
 * https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
 */

import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SpotifyButton from './components/SpotifyButton';

import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { processResponse, validateEmail } from './utils';

const useStyles = makeStyles(() => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: 2,
	}
}));

export default function Signup({ footer }) {
	const [error, setError] = React.useState(false);
	const classes = useStyles();
	const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies('token');

	const handleSignup = (e) => {
		e.preventDefault();
		if (e.target.password.value !== e.target.password2.value)
			return setError('Le password non coincidono');
		else if (!validateEmail(e.target.email.value))
			return setError('Email non valida');
		else 
			fetch('http://spotimeet.fedele.website/api/signup', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: e.target.email.value,
				password: e.target.password.value,
				fullname: e.target.fullname.value
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
				<form className={classes.form} onSubmit={handleSignup}>
					<TextField
						error={!!error}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="fullname"
						label="Nome completo"
						name="fullname"
						autoFocus
					/>
					<TextField
						error={!!error}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
					/>
					<TextField
						error={!!error}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
					/>
					<TextField
						error={!!error}
						helperText={error}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password2"
						label="Conferma Password"
						type="password"
						id="password2"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
					>
						Registrati
					</Button>
					<Grid container>
						<Grid item>
							<Link onClick={()=>{navigate("/home/login")}} variant="body2" underline="hover">
								{"Hai già un account? Clicca qui per accedere"}
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
