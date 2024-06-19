/**
 * Reference
 * https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
 */

import React, { useEffect } from 'react';
import { Link, Grid, Box, Typography } from '@mui/material';
import Flower1 from './assets/Flower1.svg';
import Flower2 from './assets/Flower2.svg';
import Flower3 from './assets/Flower3.svg';
import Flower4 from './assets/Flower4.svg';
import Flower5 from './assets/Flower5.svg';
import Login from './Login.js';
import Signup from './Signup.js';
import { Route, Routes } from 'react-router-dom';

export default function Home({ }) {
	
	const spinAnimation = { animation: 'spin 30s linear infinite, grow 2s ease-in-out infinite alternate'};

	const keyframesStyle = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } @keyframes grow { 0% { transform: scale(1); } 50% { transform: scale(2); } 100% { transform: scale(1); }}}`;

	return (
		<Box sx={{position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'linear-gradient(90deg, rgba(161,56,147,1) 0%, rgba(98,155,238,1) 100%)'}}>
			<style>
				{keyframesStyle}
			</style>
			<img src={Flower1} alt="fiore1" style={{ width: '100vw', height: '100vh', position: 'absolute', left: '30%', top: '0%', zIndex: '-1', transform: 'translateY(-30%)', ...spinAnimation }} />
            <img src={Flower3} alt="fiore3" style={{ width: '100vw', height: '100vh', position: 'absolute', right: '30%', top: '15%', zIndex: '-1', transform: 'translateY(-70%)', ...spinAnimation }} />
            <img src={Flower4} alt="fiore4" style={{ width: '100vw', height: '100vh', position: 'absolute', left: '00%', bottom: '40%', zIndex: '-1', transform: 'translateY(-70%)',...spinAnimation }} />
            <img src={Flower5} alt="fiore5" style={{ width: '100vw', height: '100vh', position: 'absolute', right: '00%', top: '50%', zIndex: '-1', transform: 'translateY(-100%)',...spinAnimation }} />
            <img src={Flower2} alt="fiore2" style={{ width: '25vw', height: '25vh', position: 'absolute', right: '0', top: '50%', zIndex: '-1', transform: 'translateY(-50%)', ...spinAnimation }} />
			<Grid container spacing={2} justifyContent="center" alignItems="center" sx={{height:'100vh'}}>
				<Grid item lg={6} xs={12}>
					<Box sx={{marginTop:'0em'}}> <Typography component="h1" variant='h1'align="center"> Spotimeet </Typography> </Box>
				</Grid>
				<Grid item lg={6} xs={12} sx={{verticalAlign: 'middle'}}>
                <Box>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </Box>
                </Grid>
            </Grid>
		</Box>
	);
}