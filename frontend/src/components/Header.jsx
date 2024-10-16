import React, { useEffect } from 'react';
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
  Avatar,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartItems, setCartItems] = React.useState(5);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const isLoggedIn = !!localStorage.getItem('user');
  const user = JSON.parse(localStorage.getItem('user')); 
  const profilePic = user?.userDetail?.pic || '/default-profile.png'; 
  const userId = user?.userDetail.id;
  const api = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${api}/api/cart/user/${userId}`);

        if(!response.data.exits){
        setCartItems(response.data.cartItem.length);
        }else{
          setCartItems(0);
        }
      } catch (err) {
        console.log(err.message);
      } 
    };

    if(userId){
      fetchCartItems();
    }
  }, [userId]);
  

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
    <AppBar sx={{ backgroundColor: '#ff788f' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Shop Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
          <IconButton edge="start" color="inherit" aria-label="store">
            <StoreIcon sx={{ fontSize: 40, color: 'black' }} />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ ml: 1 }}>
            <strong style={{ color: '#1F2544' }}>
              <strong style={{ fontSize: '40px' }}>S</strong>hop
            </strong>
            <strong style={{ color: '#FFD0EC' }}>
              no<strong style={{ fontSize: '40px' }}>W</strong>
            </strong>
          </Typography>
        </Box>

        {/* Buttons or User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              {/* Cart Icon with Badge */}
              <IconButton color="inherit">
                <Badge badgeContent={cartItems} color="secondary">
                  <ShoppingCartIcon sx={{ color: '#FFD0EC' }} onClick={()=>nav('/home/cart')}/>
                </Badge>
              </IconButton>
              {/* Profile Avatar */}
              <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
                <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 40, height: 40 }} />
              </IconButton>
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
