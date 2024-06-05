import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import { mainNavbarItems } from './sidebarItems';
import { useNavigate } from 'react-router-dom';
import UserCard from './components/UserCard';
import DebouncedInput from './components/DebouncedInput';
/**
 * Reference: https://mui.com/material-ui/react-drawer/#mini-variant-drawer
 */

const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  margin: "20px 0px 20px 20px",
  // backgroundColor: '#332D2A', // Sfondo grigio
  //border: '4px solid #FF6D2E', // Bordo arancione
  borderRadius: '12px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  margin: "20px 0px 20px 20px",
  // backgroundColor: '#332D2A', // Sfondo grigio
  //border: '4px solid #FF6D2E', // Bordo arancione
  borderRadius: '12px',
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
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
  })
);

export default function Sidebar({ user, searchHandler }) {  //utile per eventuali voci del menu tramite permessi
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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

      { open ? <UserCard user={user} /> : null}

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
        : <DebouncedInput onInput={(q) => {navigate('/'); searchHandler(q)}} />}
        {mainNavbarItems.map((item, index) => (
          <Box key={index} sx={{ m: open ? 2 : null, borderRadius: '10px', border: open ? '2px solid #FF6D2E' : 'unset' }}>
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 72,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  transition: 'background-color 0.5s ease',
                  backgroundColor: open ? '#FF6D2E' : '#332D2A',
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
