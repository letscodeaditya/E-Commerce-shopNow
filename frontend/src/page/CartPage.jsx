import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_API_BASE_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.userDetail.id; 
  const navigate = useNavigate();

  // Fetch user cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${api}/api/cart/user/${userId}`);
        if(!response.data.exits){
            setCartItems(response.data.cartItem);
            setIsCartEmpty(false);
        }else{
            setIsCartEmpty(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    if (quantity < 1) return; // Avoid updating to less than 1
    try {
      await axios.patch(`${api}/api/cart/update/${itemId}`, { quantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Delete cart item
  const deleteCartItem = async (itemId) => {
    try {
      await axios.delete(`${api}/api/cart/delete/${itemId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.log(err);
    }
  };

  // Empty the entire cart
  const emptyCart = async () => {
    try {
      await axios.delete(`${api}/api/cart/user/deleteall/${userId}`);
      setCartItems([]);
      setIsCartEmpty(true);
    } catch (err) {
      console.log(err);
    }
  };



  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt:20}}>
        <CircularProgress color="secondary" size="6rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 5 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 12, bgcolor:'white',p:5, borderRadius:'20px'}}>
      <Typography variant="h4" gutterBottom >
        Your Cart
      </Typography>

      {isCartEmpty ? (
        <Typography variant="h6" color="text.secondary" align="center" p={5}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
<Grid container spacing={3}>
  {cartItems.map((item) => (
    <Grid item xs={12} md={6} key={item._id}>
      <Paper sx={{ p: 2, borderRadius: 3, height: '300px' }}> {/* Set a consistent height */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              height="140"
              image={item.product.thumbnail}
              alt={item.product.name}
              sx={{ borderRadius: 3, objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* Make content fill the height */}
              <Typography variant="h6" gutterBottom>
                {item.product.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <IconButton
                  onClick={() => updateCartItem(item._id, item.quantity - 1)}
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={item.quantity}
                  variant="outlined"
                  size="small"
                  sx={{ width: '50px', textAlign: 'center' }}
                />
                <IconButton
                  onClick={() => updateCartItem(item._id, item.quantity + 1)}
                >
                  <Add />
                </IconButton>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  Rs {item.product.price.toFixed(2)}
                </Typography>
              </Box>
              <IconButton
                onClick={() => deleteCartItem(item._id)}
                sx={{ mt: 2, alignSelf: 'flex-start' }}
              >
                <Delete color="error" />
              </IconButton>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  ))}
</Grid>


          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="error"
              onClick={emptyCart}
              sx={{ borderRadius: 3, py: 1.5 }}
            >
              Empty Cart
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
