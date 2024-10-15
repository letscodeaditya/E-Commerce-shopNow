import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Lottie from "lottie-react";
import signUpAnimation from "./signUpAnimation.json";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, clearSignupError, resetSignupStatus } from "../authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "buyer", 
  });

  const { signupStatus, signupError, loggedInUser } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccountTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(signUpUser({ 
      name: formData.fullName, 
      email: formData.email, 
      password: formData.password, 
      userType: formData.userType
    }));
  };

  useEffect(() => {
    dispatch(clearSignupError());
    dispatch(resetSignupStatus());
  }, [dispatch]);

  useEffect(() => {
    if (signupError) {
      toast.error(signupError);
    }

    if (loggedInUser) {
      toast.success("Signup successful! Redirecting to Login page...");
      setTimeout(() => {
        nav('/login');
      }, 2000);
    }
  }, [signupError, loggedInUser]);

  return (
    <>
      <ToastContainer />
      <Grid container sx={{ height: "100vh", padding: "50px", marginTop: "50px" }}>
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
            <Lottie animationData={signUpAnimation} />
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
            Join Our Platform
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
            Sign up to continue shopping!
          </Typography>
        </Grid>

        {/* Right Section - Sign Up Form */}
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
                Create an Account
              </Typography>

              {/* Account Type Selection */}
              <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                Select Account Type:
              </Typography>
              <RadioGroup
                row
                value={formData.userType}
                onChange={handleAccountTypeChange}
                sx={{ justifyContent: "center", mb: 3 }}
              >
                <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
                <FormControlLabel value="seller" control={<Radio />} label="Seller" />
              </RadioGroup>

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  type="email"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  type="password"
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  type="password"
                  required
                />

                {/* Show loader when signing up */}
                {signupStatus === "pending" ? (
                  <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, padding: "12px", borderRadius: 1.5 }}
                  >
                    Sign Up
                  </Button>
                )}

                {/* Display error message if sign up fails */}
                {signupError && (
                  <Typography color="error" align="center" sx={{ mt: 2 }}>
                    {signupError}
                  </Typography>
                )}

                {/* Success message if signup succeeds */}
                {loggedInUser && (
                  <Typography color="success" align="center" sx={{ mt: 2 }}>
                    Signup successful! Redirecting...
                  </Typography>
                )}
              </form>

              <Typography
                variant="body2"
                sx={{ textAlign: "center", mt: 2, color: "#666" }}
              >
                Already have an account? <Link to="/login">Login here</Link>.
              </Typography>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
