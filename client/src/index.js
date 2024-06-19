import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import darkTheme from './theme';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import App from './App';
import Login from './Login.js';
import Signup from './Signup.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/login" element={<Home component={Login} theme={darkTheme}/>} />
        <Route path="/signup" element={<Home component={Signup} />} theme={darkTheme} />
        <Route path="/*" element={<App theme={darkTheme} />} />
      </Routes>
    </Router>
  </ThemeProvider>
);
