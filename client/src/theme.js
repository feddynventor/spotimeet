import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'roboto';
          font-style: normal;
          src: local('roboto')
        }
        body {
          font-family: 'sans-serif';
        }
      `,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6D2E',
    },
    background: {
      paper: '#332D2A',
    },
  },
});

export default darkTheme;