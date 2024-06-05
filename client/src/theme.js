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
          font-family: 'sans-serif';
          font-style: normal;
          src: local('sans-serif'), local('sans-serif'),
          url(https://fonts.gstatic.com/s/opensans/v26/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2) format('woff2');
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