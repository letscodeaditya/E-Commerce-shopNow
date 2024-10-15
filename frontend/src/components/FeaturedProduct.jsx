import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';

export const FeaturedProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const api = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${api}/api/products/getfeatured`);
        setFeaturedProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setError('Failed to load featured products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleDetail =(id)=>{
    nav(`/products/details/${id}`)
  }

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom color="white">
          Featured Products
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {[...Array(4)].map((_, index) => (
            <Card key={index} sx={{ textAlign: 'center', boxShadow: 3, width: '100%', maxWidth: 250 }}>
              <Skeleton height={140} />
              <CardContent>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </CardContent>
              <CardActions>
                <Skeleton width="80%" height={36} style={{ borderRadius: '20px' }} />
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom color="white">
        Featured Products
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {featuredProducts.map((product) => (
          <Card key={product._id} sx={{ textAlign: 'center', boxShadow: 3, width: '100%', maxWidth: 250 }}>
            <CardMedia
              component="img"
              height="140"
              image={product.thumbnail}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="h7">
                {product.title}
              </Typography>
                <Typography variant="body2">
                    ${product.price.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                sx={{ mx: 'auto', borderRadius: 20 }}
                onClick={()=>handleDetail(product._id)}
              >
                buy
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
