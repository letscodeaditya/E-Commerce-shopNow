import React, { useEffect, useState } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Paper,
  Box,
  Rating,
  TextField,
  Avatar,
  Skeleton,
} from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';



const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const [isInWishList, setIsInWishList] = useState(false);
  const [isInWishlistId, setWishlistId] = useState(null);
  const api = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userDetail.id : null; 
  const nav = useNavigate();
  const [quantity, setQuantity] = useState(1);



  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${api}/api/products/details/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]?.url || '');
      } catch (error) {
        setError(error.message);
        toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
      } finally {
        setLoading(false);
      }
    };

    const fetchCartDetails = async()=>{
      try{
        const response = await axios.get(`${api}/api/cart/check/${userId}/${id}`);
        if (response.data.exists) {
          setWishlistId(response.data.cartItem._id)
          setIsInWishList(true);
        } else {
          setIsInWishList(false);
        }
      } catch(error){
        console.error(error);
        setIsInWishList(false);
      }
    }

    fetchProductDetails();
    if(userId != null){
      fetchCartDetails();
    }
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = () => {
    console.log('Review Submitted:', review);
  };


  // Function to handle increment of quantity
  const handleIncrement = () => {
    if (validateQuantity(quantity + 1)) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  // Function to handle decrement of quantity
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Validation to check if requested quantity is within stock limits
  const validateQuantity = (newQuantity) => {
    if (newQuantity > product.stockQuantity) {
      toast.error(`Only ${product.stockQuantity} items in stock!`);
      return false;
    }
    return true;
  };


  //cart function
  const handleCart =async()=>{
    if(!userId){
      toast.error("please Sign in first..")
      // nav('/login')
      return;
    }

    if(isInWishList){
      axios.delete(`${api}/api/cart/delete/${isInWishlistId}`)
      .then(()=>setIsInWishList(false))
      .catch(error => toast.error(error));
    }else{
      try {
        const response = await axios.post(`${api}/api/cart/add`, {
          user: userId,
          product: id,
          quantity: quantity,
        });
        const newInterestId = response.data;
        setIsInWishList(true);
        setWishlistId(newInterestId._id);
      } catch (error) {
        toast.error('Error adding product to cart:', error.response?.data || error.message);
      }
    }

  }

  if (loading) {
    return (
      <Container sx={{ mt: 12, bgcolor: 'white', borderRadius: '20px', height: 'auto', w: '80vw' }}>
        <Grid container spacing={4}>
          {/* Skeleton for Product Image */}
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={500} />
          </Grid>

          {/* Skeleton for Product Details */}
          <Grid item xs={12} md={6}>
            <CardContent>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 2 }} />
            </CardContent>
          </Grid>
        </Grid>

        {/* Skeleton for Image Gallery */}
        <Box sx={{ mt: 6,p:2 }}>
          <Skeleton variant="text" width="30%" />
          <Grid container spacing={2}>
            {[...Array(3)].map((_, index) => (
              <Grid item xs={4} sm={3} md={2} key={index}>
                <Skeleton variant="rectangular" width="100%" height={140} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  if (error) {
    return null; // Error handled by Toastify
  }

  return (
    <Container sx={{ mt: 12, borderRadius: '20px', height: 'auto', w: '80vw' }}>
       <ToastContainer />

      <Box sx={{bgcolor:'white',p:2,borderRadius:'20px'}}>

      <Grid container spacing={4}>

        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia
              component="img"
              image={selectedImage || product.thumbnail}
              sx={{ width: '90%', objectFit: 'cover', }}
              alt="Selected Product"
              />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
  <CardContent sx={{ bgcolor: 'white', border: '2px solid black', borderRadius: '20px' }}>
    <Typography variant="h3" mb={2} sx={{ fontWeight: 'bold' }}>
      {product.title}
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
      Rs {product.price.toFixed(2)}
    </Typography>
    <Typography variant="h5" mb={2}>
      <strong>Stock Status:</strong> {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
    </Typography>

    {/* Quantity Adjustment Section */}
    <Grid container spacing={2} alignItems="center" justifyContent="center" mb={2}>
      <Grid item>
        <Button
          variant="outlined"
          sx={{ borderRadius: '50%', minWidth: '40px', minHeight: '40px' }}
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          -
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={{ textAlign: 'center', width: '40px' }}>
          {quantity}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          sx={{ borderRadius: '50%', minWidth: '40px', minHeight: '40px' }}
          onClick={handleIncrement}
          disabled={quantity >= product.stockQuantity}
        >
          +
        </Button>
      </Grid>
    </Grid>

    {/* Add/Remove from Cart Button */}
    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
      {/* If in wishlist, show 'Remove from Cart' */}
      {isInWishList ? (
        <>
          <Grid item xs={7}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ py: 1.5, borderRadius: 4, display: 'flex', alignItems: 'center' }}
              onClick={()=>handleCart()}
            >
              Remove from Cart
            </Button>
          </Grid>

          {/* "Go to Cart" Button */}
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, borderRadius: 4 }}
              onClick={()=>nav('/home/cart')}
            >
              Go to Cart
            </Button>
          </Grid>
        </>
      ) : (
        /* If not in wishlist, show 'Add to Cart' */
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5, borderRadius: 4,width:'50%',m:'20px' }}
          onClick={handleCart}
        >
          Add to Cart
        </Button>
      )}
    </Grid>
  </CardContent>
        </Grid>


  </Grid>


      {/* Image Gallery */}
      <Box sx={{ mt: 6, borderRadius:'20px', p:2 }} elevation={4}>
        <Typography variant="h6" gutterBottom>
          More Images
        </Typography>
        <Grid container spacing={2}>
          {product.images.map((img, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <CardMedia
                component="img"
                image={img}
                alt={`Product image ${index + 1}`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  border: img === selectedImage ? '3px solid #1976D2' : '3px solid transparent',
                  transition: 'border 0.3s ease-in-out',
                  '&:hover': { border: '3px solid #1976D2' },
                }}
                onClick={() => setSelectedImage(img)}
                />
            </Grid>
          ))}
        </Grid>
      </Box>

          </Box>
      {/* Additional Information */}
      <Paper sx={{ mt: 6, p: 2, borderRadius: '20px' }} elevation={4}>
        <Typography variant="h5" gutterBottom>
          Additional Information
        </Typography>
        <Grid container spacing={3} sx={{padding:2}}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Brand:</strong> {product.brand.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <strong>Category:</strong> {product.category.name}
            </Typography>
          </Grid> 
          <Grid item xs={12} md={6}>
          <Typography variant="body2">
          <strong>Description:</strong>  {product.description}
          </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Section */}
      <Paper sx={{ mt: 6, p: 3, borderRadius: '20px'   }} elevation={4}>
        <Typography variant="h6" gutterBottom>
          Customer Reviews
        </Typography>

        {/* Review Form */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>U</Avatar>
          <TextField
            name="comment"
            label="Write a review..."
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={review.comment}
            onChange={handleReviewChange}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            name="rating"
            value={review.rating}
            onChange={(e, value) => setReview({ ...review, rating: value })}
          />
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Box>

        {/* Display Reviews */}
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((rev, index) => (
            <Paper key={index} sx={{ p: 2, mt: 2 }}>
              <Typography variant="body2">
                <strong>{rev.user.name}</strong> ({rev.rating} stars)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rev.comment}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No reviews yet.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProductDetail;
