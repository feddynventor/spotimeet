import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

/**
 * Reference: https://mui.com/material-ui/react-drawer/#mini-variant-drawer
 */

const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  margin: "20px 0px 20px 20px",
  // backgroundColor: '#332D2A', // Sfondo grigio
  border: '4px solid #FF6D2E', // Bordo arancione
  borderRadius: '12px', // Bordi arrotondati solo a destra
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  margin: "20px 0px 20px 20px",
  // backgroundColor: '#332D2A', // Sfondo grigio
  border: '4px solid #FF6D2E', // Bordo arancione
  borderRadius: '12px', // Bordi arrotondati solo a destra
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer)(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  window.onresize = () => {
    if (window.innerWidth < 600 && window.innerWidth < window.innerHeight) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  }

  return (
    <Drawer variant="permanent" open={open}>
      <ListItem disablePadding>
        <ListItemButton 
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={open ? handleDrawerClose : handleDrawerOpen}>
          <MenuIcon />
        </ListItemButton>
      </ListItem>

      { open ? <Box fullWidth sx={{ m:2 }}>
        <Grid container direction="row" alignItems="center">
          <Avatar sx={{ width: 56, height: 56 }}>NC</Avatar>
          <Typography sx={{ margin: '1rem' }} variant="h5">Nicola Cucinella</Typography>
        </Grid>
      </Box> : null }

      <List>
        { !open ? 
        <ListItem key="search" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={()=>{

              handleDrawerOpen();
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <SearchIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        : <FormControl sx={{ m: 2, width: '90%' }}>
          <InputLabel htmlFor="searchBar">Ricerca</InputLabel>
          <OutlinedInput
            autoFocus
            id="searchBar"
            startAdornment={<InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>}
            label="Ricerca"
            sx={{borderRadius:'25px'}}
          />
        </FormControl> }
        {['Artisti', 'Concerti', 'Tourne', 'Drafts'].map((text, index) => (
          <Box sx={{ m: open ? 2 : null, borderRadius: '10px', border: open ? '2px solid #FF6D2E' : 'unset'}}>
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 72,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
