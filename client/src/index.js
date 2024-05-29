import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar';

import banner from './assets/Banner_Travis.png';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GroupList from './components/GroupList';
import ArtistProfile from './components/ArtistProfile';
import darkTheme from './theme';

const groups = [
  { name: 'Group 1', members: 65, type: 'cnocert', date: '2021-10-01' },
  { name: 'Group 2', members: 12, type: 'cnocert', date: '2021-10-01' },
  { name: 'Ciccio', members: 12, type: 'cnocert', date: '2021-10-01' },
  { name: 'Group 1', members: 65, type: 'cnocert', date: '2021-10-01' },
  { name: 'Group 2', members: 12, type: 'cnocert', date: '2021-10-01' },
  { name: 'Ciccio', members: 12, type: 'cnocert', date: '2021-10-01' }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container sx={{ boxSizing: "border-box", overflow: "hidden" }} maxWidth="false">
          <Box sx={{ position: 'relative', flexGrow: 1,  justifyContent: 'center', display:"flex"}}>
              <img src={banner} alt='banner pubblicitario' style={{ width: '100%', maxHeight:"20vh", borderRadius: '12px', marginTop:"20px", maxWidth:"1100px", display:"flex" }} />
          </Box>
          <Box sx={{
              overflowY: "scroll", overflowX: "hidden", 
              marginTop:"20px", padding:"10px",
              height:"73vh", minHeight:"70vh",
              borderRadius: '12px', backgroundColor: '#332D2A',
            }}>
          <GroupList groups={groups} />
          <GroupList groups={groups} />
          </Box>

          <Box sx={{overflowY: "scroll", overflowX: "hidden", marginTop:"20px"}}>
          <ArtistProfile />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
