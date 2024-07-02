/**
 * Reference
 * https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
 */

import React, { useEffect } from 'react';
import { Link, Grid, Box, Typography } from '@mui/material';
import Flower1 from './assets/Flower1.svg';
import Flower2 from './assets/Flower2.svg';
import Flower3 from './assets/Flower3.svg';
import Avatar from '@mui/material/Avatar';
import Login from './Login.js';
import Signup from './Signup.js';
import { Route, Routes } from 'react-router-dom';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';

export default function Home() {
	
	const spinAnimation = { animation: 'spin 30s linear infinite, grow 2s ease-in-out infinite alternate'};

	const keyframesStyle = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } @keyframes grow { 0% { transform: scale(1); } 50% { transform: scale(2); } 100% { transform: scale(1); }}}`;

	return (
		<Box sx={{position: 'relative', minHeight: '100vh', overflow: 'hidden'}}>
			<Box sx={{background: 'linear-gradient(50deg, rgba(161,56,147,1) 0%, rgba(98,155,238,1) 100%)', position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', zIndex: '-1'}}>
				<img src={Flower1} alt="fiore1" style={{ width: '100vw', height: '100vh', position: 'absolute', left: '30%', top: '0%', transform: 'translateY(-30%)', ...spinAnimation }} />
				<img src={Flower3} alt="fiore3" style={{ width: '100vw', height: '100vh', position: 'absolute', right: '30%', top: '15%', transform: 'translateY(-70%)', ...spinAnimation }} />
				{/* <img src={Flower4} alt="fiore4" style={{ width: '100vw', height: '100vh', position: 'absolute', left: '00%', bottom: '40%', transform: 'translateY(-70%)',...spinAnimation }} /> */}
				{/* <img src={Flower5} alt="fiore5" style={{ width: '100vw', height: '100vh', position: 'absolute', right: '00%', top: '50%', transform: 'translateY(-100%)',...spinAnimation }} /> */}
				<img src={Flower2} alt="fiore2" style={{ width: '25vw', height: '25vh', position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', ...spinAnimation }} />
			</Box>
			<style>
				{keyframesStyle}
			</style>
			<Grid container spacing={2} justifyContent="center" alignItems="center" sx={{height:'100vh', zIndex: '10'}}>
				<Grid item lg={6} xs={12}>
					<Box display="flex" flexDirection="column" alignItems="center" sx={{margin: 2, marginTop: 0, width: '100%'}}>
						<Avatar sx={{ width: 128, height: 128 }}><GraphicEqRoundedIcon fontSize="large" style={{ color: 'white', width: 128, height: 128 }}></GraphicEqRoundedIcon></Avatar>
						<Typography variant='h2'>Spotimeet</Typography>
					</Box>
				</Grid>
				<Grid item lg={6} xs={12} sx={{verticalAlign: 'middle'}}>
                <Box>
                    <Routes>
                        <Route path="login" element={<Login footer={Copyright()} />} />
                        <Route path="signup" element={<Signup footer={Copyright()} />} />
                    </Routes>
                </Box>
                </Grid>
            </Grid>
		</Box>
	);
}

const Copyright = () => (
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
