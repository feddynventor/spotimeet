import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Sidebar';

import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GroupList from './GroupList';

const groups = [{
  name: 'Group 1',
  members: 65,
  type: 'cnocert',
  date: '2021-10-01',
}, {
  name: 'Group 2',
  members: 12,
  type: 'cnocert',
  date: '2021-10-01',
}]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Container sx={{ boxSizing: "border-box" }}>
        <Box sx={{ position: 'relative', flexGrow: 1 }}>
          <img src="https://source.unsplash.com/random/800x200" style={{ width:'100%' }} />
        </Box>
        <GroupList groups={groups} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
      </Container>
    </Box>
  </React.StrictMode>
);
