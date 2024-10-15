import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
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
  const handleLogOut=()=>{
    dispatch(logoutUser())
    nav('/login');
  }
  const handleClick = ()=>{
    nav('/');
  }

  return (
    <AppBar position="absolute">
      <Toolbar sx={{backgroundColor:'#ff788f'}}>
        <IconButton edge="start" color="inherit" aria-label="store" onClick={()=>handleClick()}>
          <StoreIcon sx={{color:'black',fontSize:'50px'}}/>
        </IconButton>
        <Typography variant="h6" component="div" sx={{color:'black',w:'50px'}}  style={{ flexGrow: 1 }} >
          <strong>ShopNow</strong> 
        </Typography> 
        {isLoggedIn ? (
          <>
            <IconButton color="dark" aria-label="cart">
              <ShoppingCartIcon />
            </IconButton>
            <Button sx={{color:'black'}} onClick={handleMenuClick}>Profile</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={()=>{nav('/home/activity')}}>Activity</MenuItem>
              <MenuItem onClick={()=>{nav('/home/profile')}}>Settings</MenuItem>
              <MenuItem onClick={()=>(handleLogOut())}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={()=>nav("/login")}>Login</Button>
            <Button color="inherit" onClick={()=>nav("/signup")}>Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
