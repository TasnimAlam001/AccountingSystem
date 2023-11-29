import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FaPlus, FaServer, FaSignOutAlt } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(localStorage.getItem('drawerOpen') === 'true' || false);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('drawerOpen', open);
  }, [open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <div className=''>
          <AppBar position='fixed' open={open} className='bg-' sx={{ backgroundColor: 'skyblue', color: 'black' }}>
            <Toolbar className='flex justify-between'>
              <div>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div className='justify-end'>
                <Typography variant='h6' noWrap component='div'>
                  <div className=' flex gap-5'>
                    <Link to="/">Home</Link>
                    <p className='cursor-pointer'>Accounts</p>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      <span>
                        <FaSignOutAlt />
                      </span>{' '}
                      Log Out
                    </div>
                    <p className='flex items-center gap-2 cursor-pointer'>
                      <FaServer /> Modules
                    </p>
                  </div>
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <div className=''>
              <p>ajica</p>
              <p>ajica</p>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ul>
              <details tabIndex={0} className='collapse collapse-arrow bg-base-200'>
                <summary className='py-3 pl-2 cursor-pointer flex items-center'>
                  {' '}
                  <div className='flex items-center gap-2'>
                    <FaPlus /> <span>Setting</span>
                  </div>
                </summary>
                <div className='collapse-content'>
                  {/* Add onClick event to reload the page */}
                  <Link to='/groupEntry'> 
                    Group Entry
                  </Link>
                </div>
              </details>
            </ul>
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Typography paragraph>
            {location.pathname === '/' && <p>Well come</p>}
            <Outlet></Outlet>
          </Typography>
        </Main>
      </Box>
    </div>
  );
};

export default Navbar;
