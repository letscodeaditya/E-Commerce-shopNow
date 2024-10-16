import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardMedia, CardContent, Grid, Typography } from "@mui/material";
import { WishList } from "./components/WishList";

const Activity = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  const handleShowListings = () => {
    navigate('/home/activity/postedproperty');
  };

  return (
    <Box sx={{ mt: 10, mb: 5, padding: '20px' }}>
      {user.userDetail.userType === "seller" ? (
        <Grid container spacing={4} justifyContent="center">
          {/* Left Column - Show Listings Button */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Card
              sx={{
                width: "100%",
                height:'225px',
                backgroundImage: "url(./posted.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "20px",
                border:'4px solid black',
                textAlign: "center",
                p: 4,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 10,
                },
              }}
            >
              <Typography variant="h5" sx={{mt:21 ,}} gutterBottom>
                <strong> Show My Products</strong>
              </Typography>

            </Card>
          </Grid>

          {/* Right Column - Flat and Bungalow AD Postings */}
          <Grid item xs={12} md={6}>

            {/* Flat AD Card */}
            <Card
              sx={{
                display: "flex",
                
                mb: 4,
                cursor: "pointer",
                borderRadius: 4,
                border:'4px solid black',
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate('/home/activity/postProduct')}
            >
              <CardMedia
                component="img"
                image="/activity.png"
                alt="Flat AD"
                sx={{ width: 300, borderRadius: 4 }}
              />
              <CardContent>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>Products Posting</Typography>
                <Typography variant="h5" sx={{mt:5}}>
                  Post your products for sale easily without any hassle.
                </Typography>

              </CardContent>
            </Card>

            
          </Grid>
        </Grid>
      ) : (
        <WishList userId={user.id} />
      )}
    </Box>
  );
};

export default Activity;
