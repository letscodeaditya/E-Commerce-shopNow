import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");

const initialState = {
  status: "idle",
  errors: null,
  resendOtpStatus: "idle",
  resendOtpSuccessMessage: null,
  resendOtpError: null,
  signupStatus: "idle",
  signupError: null,
  loginStatus: "idle",
  loginError: null,
  loggedInUser: null,
  otpVerificationStatus: "idle",
  otpVerificationError: null,
  forgotPasswordStatus: "idle",
  forgotPasswordSuccessMessage: null,
  forgotPasswordError: null,
  resetPasswordStatus: "idle",
  resetPasswordSuccessMessage: null,
  resetPasswordError: null,
  successMessage: null,
  isAuthChecked: false,
};

const api = import.meta.env.VITE_API_BASE_URL;

// Login User
export const loginUser = createAsyncThunk(`auth/loginUser`, async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/api/auth/loginuser`, formData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to sign in");
  }
});

// Sign Up User
export const signUpUser = createAsyncThunk("auth/signUpUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/api/auth/signUpUser`, formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to sign up");
  }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem("user");
    return;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to log out");
  }
});

// Verify OTP
export const verifyOtp = createAsyncThunk("user/verifyOtp", async (otpData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/api/users/verify-otp`, otpData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "OTP verification failed");
  }
});

// Resend OTP
export const resendOtp = createAsyncThunk("user/resendOtp", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/api/users/resend-otp`, { email });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to resend OTP");
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk("user/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/api/users/forgot-password`, { email });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to send password reset link");
  }
});

// Reset Password
export const resetPassword = createAsyncThunk("user/resetPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/api/users/reset-password`, data);
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to reset password");
  }
});

// Check if User is Authenticated
export const checkAuth = createAsyncThunk("user/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      return storedUser;
    } else {
      return rejectWithValue("No user is authenticated");
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to check authentication status");
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearAuthErrors: (state) => {
      state.errors = null;
    },
    resetAuthStatus: (state) => {
      state.status = "idle";
    },
    clearSignupError: (state) => {
      state.signupError = null;
    },
    resetSignupStatus: (state) => {
      state.signupStatus = "idle";
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
    },
    clearOtpVerificationError: (state) => {
      state.otpVerificationError = null;
    },
    resetOtpVerificationStatus: (state) => {
      state.otpVerificationStatus = "idle";
    },
    clearResendOtpError: (state) => {
      state.resendOtpError = null;
    },
    clearResendOtpSuccessMessage: (state) => {
      state.resendOtpSuccessMessage = null;
    },
    resetResendOtpStatus: (state) => {
      state.resendOtpStatus = "idle";
    },
    clearForgotPasswordError: (state) => {
      state.forgotPasswordError = null;
    },
    clearForgotPasswordSuccessMessage: (state) => {
      state.forgotPasswordSuccessMessage = null;
    },
    resetForgotPasswordStatus: (state) => {
      state.forgotPasswordStatus = "idle";
    },
    clearResetPasswordError: (state) => {
      state.resetPasswordError = null;
    },
    clearResetPasswordSuccessMessage: (state) => {
      state.resetPasswordSuccessMessage = null;
    },
    resetResetPasswordStatus: (state) => {
      state.resetPasswordStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.signupStatus = "pending";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.signupStatus = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.signupStatus = "rejected";
        state.signupError = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "fulfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.loginError = action.payload;
      })

      // OTP Verification
      .addCase(verifyOtp.pending, (state) => {
        state.otpVerificationStatus = "pending";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpVerificationStatus = "fulfilled";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpVerificationStatus = "rejected";
        state.otpVerificationError = action.payload;
      })

      // Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.resendOtpStatus = "pending";
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendOtpStatus = "fulfilled";
        state.resendOtpSuccessMessage = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtpStatus = "rejected";
        state.resendOtpError = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordStatus = "pending";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordStatus = "fulfilled";
        state.forgotPasswordSuccessMessage = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordStatus = "rejected";
        state.forgotPasswordError = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = "fulfilled";
        state.resetPasswordSuccessMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = "rejected";
        state.resetPasswordError = action.payload;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.loggedInUser = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.payload;
        state.isAuthChecked = false;
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.loggedInUser = null;
      });
  },
});

export const {
  clearAuthErrors,
  clearSignupError,
  clearLoginError,
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  clearForgotPasswordError,
  clearForgotPasswordSuccessMessage,
  clearResetPasswordError,
  clearResetPasswordSuccessMessage,
  resetSignupStatus,
  resetLoginStatus,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
  resetForgotPasswordStatus,
  resetResetPasswordStatus,
  resetAuthStatus,
  clearAuthSuccessMessage,
} = authSlice.actions;

export default authSlice.reducer;
