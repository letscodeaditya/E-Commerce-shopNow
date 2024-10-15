import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from "@mui/material";
import Lottie from 'lottie-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAuthErrors } from '../authSlice'; 
import loginAnimation from './signInAnimation.json'; 
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const {loginStatus, loginError, loggedInUser} = useSelector((state) => state.auth);
  const nav = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };


  useEffect(() => {
    if (loginStatus === "fulfilled") {
      setEmail("");
      setPassword("");
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        nav('/')
        }, 2000);
    }
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch, loginStatus]);

  return (
    <Grid container sx={{ height: "100vh", padding: '50px', marginTop:'50px', }}>
      {/* Left Section - Hero/Animation */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border:'2px solid black',
          borderRadius:'20px',
        }}
      >
        {/* Hero Image/Animation */}
        <Box component="div">
          <Lottie animationData={loginAnimation} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            color: "#777",
            textAlign: "center",
            px: 4,
          }}
        >
          Sign in to your account to continue shopping!
        </Typography>
      </Grid>

      {/* Right Section - Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          
          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 4, border:'2px solid black',
          borderRadius:'20px', }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
            >
              Sign In to Your Account
            </Typography>

            {/* Error Message */}
            {loginError && (
              <Typography variant="body2" color="error" sx={{ textAlign: "center", mb: 2 }}>
                {loginError}
              </Typography>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                variant="outlined"
                margin="normal"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, padding: "12px", borderRadius: 1.5 }}
                disabled={loginStatus === "pending"} // Disable button while loading
              >
                {loginStatus === "pending" ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 2, color: "#666" }}
            >
              Don't have an account? <Link to="/signup">Sign up here</Link>.
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
