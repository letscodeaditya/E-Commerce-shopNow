import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#282c34", // Dark background
        color: "white",
        padding: "40px 0",
        borderTop: "1px solid #e0e0e0",
        marginTop: '50px',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              shopnpw is the india leading e-comm website right now
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" style={{ textDecoration: "none", color: "white" }}>
                  Shop
                </a>
              </li>
              <li>
                <a href="/contact" style={{ textDecoration: "none", color: "white" }}>
                  Contact
                </a>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://facebook.com" sx={{ "&:hover": { color: "#3b5998" } }}>
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" sx={{ "&:hover": { color: "#1da1f2" } }}>
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" sx={{ "&:hover": { color: "#c32aa3" } }}>
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "white" }} />

        <Typography variant="body2" color="white" align="center" sx={{ mt: 4 }}>
          &copy; {new Date().getFullYear()} ShowNow. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
