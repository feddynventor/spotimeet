/**
 * Reference
 * https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
 */

import React from 'react';
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

export default function Signup({ footer }) {
	const classes = useStyles();

	const navigate = useNavigate();


	return (
		<Container component="main" maxWidth="xs" sx={{backgroundColor:'rgba(1,1,1,0.5)', borderRadius:'20px', padding:'20px'}}>
			<div className={classes.paper}>
				<SpotifyButton oauthUrl="http://spotimeet.fedele.website/api/login/oauth" />
				<Box className={classes.form}>
					<TextField
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
				</Box>
			</div>
			<Box m={6}>
				{footer}
			</Box>
		</Container>
	);
}
