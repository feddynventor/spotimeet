import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import darkTheme from './theme';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Login from './Login';
import Signup from './Signup';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Routes>
            <Route path="/login" element={<Login theme={darkTheme} />} />
            <Route path="/signup" element={<Signup theme={darkTheme} />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
