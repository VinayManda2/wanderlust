import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Function to get token data from localStorage
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      // Check if the token is expired
      if (decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired. Remove it from localStorage.");
        localStorage.removeItem("token");
        return null; // Token expired, return null
      } else {
        return {
          userId: decoded.userId,
          username: decoded.username,
        };
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; // Decoding error, return null
    }
  }
  return null; // No token found in localStorage
};

// Initialize state based on token in localStorage, if exists
const tokenData = getTokenFromLocalStorage();

const initialState = tokenData
  ? {
      userId: tokenData.userId,
      username: tokenData.username,
      isAuthenticated: true,
    }
  : {
      userId: null,
      username: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const { userId, username } = action.payload;
      state.userId = userId;
      state.username = username;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userId = null;
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

// Selector to retrieve user state
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
