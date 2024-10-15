import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import FastDeliveryIcon from "@mui/icons-material/LocalShipping";
import FeatureIcon from "@mui/icons-material/Star";
import CategoryIcon from "@mui/icons-material/Category";
import Footer from "../components/Footer";
import { FeaturedProduct } from "../components/FeaturedProduct";
import { useNavigate } from "react-router-dom";

// Sample product data
const category = [
    {
        id:1,
        name: "Electronics",
        image:'\elect.jpg'
    },
    {
        id:2,
        name: "Fashion",
        image:'\cloth.jpg'
    },
    {
        id:3,
        name: "kitchen",
        image:'\kitchen.jpg'
    },
    {
        id:4,
        name: "Shoe",
        image:'\shoe.jpg'
    },
     
]


const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    image: "https://via.placeholder.com/150?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 89.99,
    image: "https://via.placeholder.com/150?text=Smart+Watch",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 29.99,
    image: "https://via.placeholder.com/150?text=Speaker",
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: 59.99,
    image: "https://via.placeholder.com/150?text=Fitness+Tracker",
  },
];

const Home = () => {

  const nav = useNavigate();

  const handleproduct =()=>{
    
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url(./home.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          mt: 9,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Discover Amazing Products
        </Typography>
        <Typography variant="h5" gutterBottom>
          Get the best deals delivered to your doorstep!
        </Typography>

      </Box>

 

      {/* Shop by Category Section */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom color="white">
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {category.map(
            (category) => (
              <Grid item xs={6} sm={3} key={category.id}>
                <Card sx={{ textAlign: "center", boxShadow: 3,borderRadius:'30px',border:'2px solid black' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{category.name}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 1, borderRadius: 20 }}
                      onClick={()=>nav(`/productByCategory/${category.name}`)}
                    >
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Container>

      

      {/* Featured Products Section */}
      <FeaturedProduct/>

       {/* Features Section */}
        <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="white">
          Why Shop With Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                height: "240px", // Adjusted height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                boxShadow: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <FastDeliveryIcon sx={{ fontSize: 50, color: "#4caf50" }} />
              <Typography variant="h6">Fast Delivery</Typography>
              <Typography variant="body1" align="center">
                Get your products delivered within hours!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                height: "240px", // Adjusted height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                boxShadow: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <FeatureIcon sx={{ fontSize: 50, color: "#ff9800" }} />
              <Typography variant="h6">Top Quality</Typography>
              <Typography variant="body1" align="center">
                Discover amazing features to enhance your shopping experience.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                height: "240px", // Adjusted height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                boxShadow: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CategoryIcon sx={{ fontSize: 50, color: "#2196f3" }} />
              <Typography variant="h6">Shop by Category</Typography>
              <Typography variant="body1" align="center">
                Browse through a wide range of categories.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default Home;
