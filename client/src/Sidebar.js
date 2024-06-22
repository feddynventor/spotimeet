import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import UserCard from './components/UserCard';
import DebouncedInput from './components/DebouncedInput';
import SidebarEntry from './SidebarEntry';
import { mainNavbarItems } from './sidebarItems';
/**
 * Reference: https://mui.com/material-ui/react-drawer/#mini-variant-drawer
 */

const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  margin: "20px 0px 20px 20px",
  // backgroundColor: '#332D2A', // Sfondo grigio
  //border: '4px solid #FF6D2E', // Bordo arancione
  borderRadius: "20px",
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
  borderRadius: "20px",
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
  const [cookies, setCookie, removeCookie] = useCookies('token');

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

        {mainNavbarItems.map( (item, index) => <SidebarEntry index={index} isOpened={open} icon={item.icon} label={item.label} callback={() => handleNavigation(item.path)}></SidebarEntry> )}
        <SidebarEntry index={0} isOpened={open} icon={<LogoutIcon />} label={"Esci"} callback={() => {setCookie("token", '', {
            maxAge: 0,
            sameSite: 'strict'
          })
          navigate("/home/login")
        }}></SidebarEntry>
      </List>
    </Drawer>
  );
}
