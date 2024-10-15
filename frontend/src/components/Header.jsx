import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const isLoggedIn = !!localStorage.getItem('user');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
    nav('/login');
  };

  const handleClick = () => {
    nav('/');
  };

  return (
    <AppBar  sx={{ backgroundColor: '#ff788f' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Shop Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
          <IconButton edge="start" color="inherit" aria-label="store">
            <StoreIcon sx={{ fontSize: 40, color: 'white' }} />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ ml: 1, color: 'white', fontWeight: 'bold' }}>
            ShopNow
          </Typography>
        </Box>

        {/* Buttons or User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              {/* Cart Icon with Badge */}
              <IconButton color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <ShoppingCartIcon sx={{ color: 'white' }} />
                </Badge>
              </IconButton>
              {/* Profile Menu */}
              <Button
                onClick={handleMenuClick}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  ml: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                  },
                }}
              >
                Profile
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                  },
                }}
              >
                <MenuItem onClick={() => nav('/home/activity')}>Activity</MenuItem>
                <MenuItem onClick={() => nav('/home/profile')}>Settings</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  mr: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                  },
                }}
                onClick={() => nav('/login')}
              >
                Login
              </Button>
              <Button
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                  },
                }}
                onClick={() => nav('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
