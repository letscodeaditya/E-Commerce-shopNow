import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Box,
  Rating,
  TextField,
  Avatar,
} from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const api = import.meta.env.VITE_API_BASE_URL;

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
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = () => {
    console.log('Review Submitted:', review);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container  sx={{ mt: 15,bgcolor:"white",borderRadius:'20px', height:'auto' }}>
      {/* Product Main Card */}
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              image={selectedImage || product.thumbnail}
              sx={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '10px' }}
              alt="Selected Product"
            />
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
              {product.title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              {product.description}
            </Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, borderRadius: 4 }}>
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>

      {/* Image Gallery */}
      <Box sx={{ mt: 6 }}>
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

      {/* Additional Information */}
      <Paper sx={{ mt: 6, p: 3 , borderRadius:'20px'  }} elevation={4}>
        <Typography variant="h6" gutterBottom>
          Additional Information
        </Typography>
        <Grid container spacing={2}>
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
              <strong>Stock Status:</strong> {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Section */}
      <Paper sx={{ mt: 6, p: 3,borderRadius:'20px',mb:5 }} elevation={4}>
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2}}>
            No reviews yet.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProductDetail;
